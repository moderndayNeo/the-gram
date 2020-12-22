class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.integer :notifiable_id, null: false, polymorphic: true
      t.string :notifiable_type, null: false
      t.integer :notified_user_id, null: false
      t.integer :source_user_id, null: false
      t.string :message, null: false

      t.boolean :read, null: false, default: false
      t.integer :source_post_id, null: true
      t.integer :source_comment_id, null: true

      t.timestamps
    end

    add_index :notifications, :notified_user_id
    add_index :notifications,
      [:notified_user_id, :notifiable_type, :notifiable_id],
      unique: true,
      name: "index_notifications_on_notified_user_and_notifiable"
  end
end

