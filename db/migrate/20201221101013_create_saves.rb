class CreateSaves < ActiveRecord::Migration[6.0]
  def change
    create_table :saves do |t|
      t.integer :user_id, null: false
      t.integer :post_id, null: false

      t.timestamps
    end

    add_index :saves, :user_id
    add_index :saves, :post_id
  end
end
