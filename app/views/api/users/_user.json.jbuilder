json.extract! user, :id, :name, :username, :email, :bio
json.image_url url_for(user.photo) if user.photo.attached?
json.num_posts user.posts.length
json.liked_post_ids user.liked_posts.pluck(:id)
json.num_followers user.followers.size