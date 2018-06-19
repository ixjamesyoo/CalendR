class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.datetime :start, null: false
      t.datetime :end, null: false
      t.integer :all_day?, null: false, default: 0
      t.string :location
      t.text :notes
    end

    add_index :events, [:user_id, :start]
  end
end
