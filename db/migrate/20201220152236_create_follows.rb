class CreateFollows < ActiveRecord::Migration[6.0]
  def change
    create_table :follows do |t|
      t.integer :follower_id, null: false
      t.integer :followee_id, null: false, polymorphic: true
      t.integer :followee_type, null: false

      t.timestamps
    end

    add_index :follows, [:follower_id, :followee_type, :followee_id], unique: true
    add_index :follows, [:followee_type, :followee_id]
  end
end



# class CreateFollows < ActiveRecord::Migration[6.0]
#   def change
#     create_table :follows do |t|
#       t.integer :follower_id, null: false
#       t.integer :followee_id, null: false, polymorphic: true
#       t.string :followee_type, null: false

#       t.timestamps
#     end

#     add_index :follows, [:follower_id, :followee_type, :followee_id], unique: true
#     add_index :follows, [:followee_type, :followee_id]
#   end
# end
