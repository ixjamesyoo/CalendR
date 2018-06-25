# == Schema Information
#
# Table name: events
#
#  id       :bigint(8)        not null, primary key
#  user_id  :integer          not null
#  title    :string           not null
#  start    :datetime         not null
#  ending   :datetime         not null
#  location :string
#  notes    :text
#

class Event < ApplicationRecord
  validates :user_id, :title, :start, :ending, presence: true
  validate :start_before_ending

  belongs_to :user

  def start_before_ending
    unless start <= ending
      errors[:event] << "start must be before end"
    end
  end
end
