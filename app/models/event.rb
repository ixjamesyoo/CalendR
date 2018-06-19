# == Schema Information
#
# Table name: events
#
#  id       :bigint(8)        not null, primary key
#  user_id  :integer          not null
#  title    :string           not null
#  start    :datetime         not null
#  ending   :datetime         not null
#  all_day  :integer          default(0), not null
#  location :string
#  notes    :text
#

class Event < ApplicationRecord
  before_validation :strip_timezone

  validates :user_id, :title, :start, :ending, :all_day, presence: true
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
