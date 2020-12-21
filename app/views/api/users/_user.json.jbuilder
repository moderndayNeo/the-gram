json.extract! user, :id, :name, :username, :email, :bio
json.image_url url_for(user.photo) if user.photo.attached?
json.num_posts user.posts.length
json.liked_post_ids user.liked_posts.pluck(:id)
json.num_followers user.followers.size
json.num_following user.followed_users.size
json.followed_user_ids user.followed_users.pluck(:id)
json.saved_post_ids user.saved_posts.pluck(:id)
