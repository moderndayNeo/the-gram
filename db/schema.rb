# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_22_103646) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.integer "author_id", null: false
    t.integer "post_id", null: false
    t.integer "parent_comment_id"
    t.string "body", limit: 300, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["parent_comment_id"], name: "index_comments_on_parent_comment_id"
    t.index ["post_id"], name: "index_comments_on_post_id"
  end

  create_table "follows", force: :cascade do |t|
    t.integer "follower_id", null: false
    t.integer "followee_id", null: false
    t.string "followee_type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["followee_type", "followee_id"], name: "index_follows_on_followee_type_and_followee_id"
    t.index ["follower_id", "followee_type", "followee_id"], name: "index_follows_on_follower_id_and_followee_type_and_followee_id", unique: true
  end

  create_table "likes", force: :cascade do |t|
    t.integer "liker_id", null: false
    t.integer "likeable_id", null: false
    t.string "likeable_type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["likeable_type", "likeable_id"], name: "index_likes_on_likeable_type_and_likeable_id"
    t.index ["liker_id", "likeable_type", "likeable_id"], name: "index_likes_on_liker_id_and_likeable_type_and_likeable_id", unique: true
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "notifiable_id", null: false
    t.string "notifiable_type", null: false
    t.integer "notified_user_id", null: false
    t.integer "source_user_id", null: false
    t.string "message", null: false
    t.boolean "read", default: false, null: false
    t.integer "source_post_id"
    t.integer "source_comment_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["notified_user_id", "notifiable_type", "notifiable_id"], name: "index_notifications_on_notified_user_and_notifiable", unique: true
    t.index ["notified_user_id"], name: "index_notifications_on_notified_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.integer "author_id", null: false
    t.string "caption", limit: 2200
    t.string "location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_id"], name: "index_posts_on_author_id"
    t.index ["created_at"], name: "index_posts_on_created_at"
  end

  create_table "saves", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_saves_on_post_id"
    t.index ["user_id"], name: "index_saves_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", limit: 30, null: false
    t.string "username", limit: 30, null: false
    t.string "email", limit: 254, null: false
    t.string "bio", limit: 150
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
