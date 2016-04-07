require 'byebug'
require 'csv'
require 'json'

lines = CSV.open(ARGV[0]).readlines
keys = lines.delete(lines.first)
schedule = []

lines.each do |row|

  raw_date = row[0]
  raw_time = row[1]
  teams = row[3].split()
  raw_location = row[4]

  # give date year four digits instead of two
  date = "#{raw_date[0..5]}20#{raw_date[6..-1]}"

  # format time: remove space, downcase AM/PM
  time = "#{raw_time[0..4]}#{raw_time[-2..-1].downcase!}"

  # remove leading 0
  time = time[1..-1] if time[0] === "0"

  # select opponent depending on home team
  opponent = teams[0] == "Giants" ? teams[2] : teams[0]

  # remove location city
  location = raw_location.split(' - ')[0]
  
  json_data = { "date": date,
                "location": location,
                "opponent": opponent,
                "time": time
              }

  schedule << json_data
end

full_contents = { "title": "Giants Game Schedule",
                  "link": "http://www.isthereagiantsgametoday.com/",
                  "games": schedule }

File.open(ARGV[1], "w") do |file|
  file.puts JSON.pretty_generate(full_contents)
end
