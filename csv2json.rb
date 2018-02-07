require 'byebug'
require 'csv'
require 'json'

# give date year four digits instead of two
def parse_date(row)
  raw_date = row[0]
  Date.strptime(raw_date, '%m/%d/%y')
end

# format time: remove space, downcase AM/PM
def parse_time(row)
  raw_time = row[1]
  time = "#{raw_time[0..4]}#{raw_time[-2..-1].downcase!}"

  # remove leading 0
  time = time[1..-1] if time[0] === '0'
  time
end

# select opponent depending on home team
def parse_teams(row)
  teams = row[3].split
  teams[0] == 'Giants' ? teams[2] : teams[0]
end

# remove location city
def parse_location(row)
  raw_location = row[4]
  raw_location.split(' - ')[0]
end

def parse_and_print(input_file_path: "data/source/#{Date.today.strftime('%Y')}EventTicketPromotionPrice.csv",
                    output_file_path: "data/giants#{Date.today.strftime('%Y')}schedule.json")
  schedule = []
  CSV.foreach(input_file_path, headers: true) do |row|

    # Hack alert
    next if row[3] == 'NL All-Stars at AL All-Stars - Time TBD'

    date = parse_date(row)
    time = parse_time(row)
    opponent = parse_teams(row)
    location = parse_location(row)

    json_data = {date: date.strftime('%m/%d/%Y'),
                 location: location,
                 opponent: opponent,
                 time: time
    }

    schedule << json_data
  end

  full_contents = { title: 'Giants Game Schedule',
                    link: 'http://www.isthereagiantsgametoday.com/',
                    games: schedule }

  File.open(output_file_path, 'w') do |file|
    file.puts JSON.pretty_generate(full_contents)
  end
end

parse_and_print
