json.extract! event, :id, :title, :start, :ending, :all_day

if event.location
  json.extract! event, :location
end

if event.notes
  json.extract! event, :notes
end
