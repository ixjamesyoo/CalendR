class RemoveAllDay < ActiveRecord::Migration[5.1]
  def change
    remove_column :events, :all_day
  end
end
