# How to retrieve input data for this script:
# Go to http://mlb.mlb.com/mlb/schedule/team_by_team.jsp
# Click on Regular Schedule
# Scroll down and click on Downloadable schedule
# e.g. http://sanfrancisco.giants.mlb.com/schedule/downloadable.jsp?c_id=sf&year=2012
# Click on Download Full Season Schedule

import csv
import json
from sys import argv

source_csv = argv[1]        # "test.csv"
destination_json = argv[2]  # "test.json"

raw_schedule = csv.reader(open(source_csv, 'r'), delimiter=',')
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
    if int(time[0]) == 0:
        time = time[1:]

    # Trim the subject description down to the opponent name
    opponent = row[3]
    opponent = opponent.replace('at', '').replace('Giants', '').strip()

    json_data = { "date": date,
                  "opponent": opponent,
                  "time": time,
                  "location": row[4] }
    schedule.append(json_data)

full_contents = { "title": "Giants Game Schedule",
                  "link": "http://www.isthereagiantsgametoday.com/",
                  "games": schedule }

# Pretty printing, just like in the json library docs example
# http://docs.python.org/library/json.html
f = open(destination_json, 'w')
f.write(json.dumps(full_contents, sort_keys=True, indent=4))