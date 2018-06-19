class RenameAllDay < ActiveRecord::Migration[5.1]
  def change
    rename_column :events, :all_day?, :all_day
  end
end
