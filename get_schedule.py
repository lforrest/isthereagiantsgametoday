#!/usr/bin/env python
'''
Process a team schedule from mlb.com to be used as backend data
for www.isthereagiantsgametoday.com.

Outputs a json document by default to data/giants<YEAR>schedule.json.

Takes the following args:
    output-file:    the file to write the json to
    url:            the url to pull the schedule from

This script is intended to be used as part of a CI pipeline to generate
data upon build, however, it can be used manually without issue.
'''

import argparse
import csv
import datetime
import json
import requests


CSV_URL = 'http://mlb.mlb.com/ticketing-client/csv/EventTicketPromotionPrice.tiksrv?team_id=137&display_in=singlegame&ticket_category=Tickets&site_section=Default&sub_category=Default&leave_empty_games=true&event_type=T' # pylint: disable=C0301
OUTFILE = 'data/giants{}schedule.json'.format(datetime.datetime.now().year)

def getcsv(url):
    '''
    Given a url to a csv, pull, decode and return the csv.
    '''
    with requests.Session() as session:
        download = session.get(url)
        decoded_content = download.content.decode('utf-8')
        return decoded_content

def process_schedule(csvdata):
    '''
    Given an mlb schedule csv, return the date, opponent, time and location
    fields in a json document.
    '''
    raw_schedule = csv.reader(csvdata.splitlines(), delimiter=',')
    schedule = []

    # Skip header row
    next(raw_schedule)

    # This CSV has 17 fields for each game, but we only want the following
    # four fields, which will look like this:

    # "date": "4/6/2012"        row[0]
    # "opponent": "D-backs"     row[3]
    # "time": "4:10pm"          row[1]
    # "location":"Chase Field"  row[4]

    for row in raw_schedule:
        # CSV uses 2-digit years; we want 4 digits in the JSON.
        date = ''.join([row[0][:6], '20', row[0][-2:]])

        # Remove the space and make "pm" lowercase
        time = ''.join(c.lower() for c in row[1] if not c.isspace())

        # Remove leading zeroes from times, such as 02:00pm
        if time and int(time[0]) == 0:
            time = time[1:]

        # Trim the subject description down to the opponent name
        opponent = row[3]
        opponent = opponent.replace('at', '').replace('Giants', '').strip()

        json_data = {"date": date,
                     "opponent": opponent,
                     "time": time,
                     "location": row[4]}
        schedule.append(json_data)

    full_contents = {"title": "Giants Game Schedule",
                     "link": "http://www.isthereagiantsgametoday.com/",
                     "games": schedule}

    return full_contents

def output_json(jsondata, outfile):
    '''
    Write given json data to the specified output file.
    '''
    with open(outfile, 'wb') as writefile:
        writefile.write(json.dumps(jsondata, sort_keys=True, indent=4))

def main(): # pylint: disable=C0111
    parser = argparse.ArgumentParser(description='Output an MLB schedule as JSON.')
    parser.add_argument('-o', '--output-file',
                        dest='outfile',
                        help="file to write to",
                        default=OUTFILE)
    parser.add_argument('-u', '--url',
                        dest='url',
                        help="url to pull schedule from",
                        default=CSV_URL)

    args = parser.parse_args()

    try:
        csvschedule = getcsv(args.url)
        jsonschedule = process_schedule(csvschedule)
        output_json(jsonschedule, args.outfile)
    except:
        raise

if __name__ == '__main__':
    main()
