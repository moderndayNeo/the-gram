class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.integer :author_id, null: false
      t.string :caption, limit: 2200, null: true
      t.string :location, null: true

      t.timestamps
    end

    add_index :posts, :author_id
    add_index :posts, :created_at
  end
end

