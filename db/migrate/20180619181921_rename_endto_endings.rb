class RenameEndtoEndings < ActiveRecord::Migration[5.1]
  def change
    rename_column :events, :end, :ending
  end
end
