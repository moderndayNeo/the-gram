class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, null: false, limit: 30
      t.string :username, null: false, limit: 30
      t.string :email, null: false, limit: 254
      t.string :bio, null: true, limit: 150
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.timestamps
    end

    add_index :users, :name
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
