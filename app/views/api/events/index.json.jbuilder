@events.each do |event|
  json.set! event.id do
    json.partial! 'api/events/event', event: event
  end
end

json.event_ids @events.map(&:id)
