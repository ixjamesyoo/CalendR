class Event < ApplicationRecord
  before_validation :strip_timezone

  validates :user_id, :title, :start, :ending, :all_day?, presence: true
  validates :all_day, inclusion: { in: 0..1 }
  validate :start_before_ending

  belongs_to :user

  def strip_timezone
    start.change(offset: "+0000")
    ending.change(offset: "+0000")
  end

  def start_before_ending
    unless start < ending
      errors[:event] < "start must be before end"
    end
  end
end

# t.integer "user_id", null: false
# t.string "title", null: false
# t.datetime "start", null: false
# t.datetime "end", null: false
# t.integer "all_day?", default: 0, null: false
# t.string "location"
# t.text "notes"
