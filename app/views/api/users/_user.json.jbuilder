json.extract! user, :id, :name, :username, :email, :bio
json.image_url url_for(user.photo) if user.photo.attached?
json.num_posts user.posts.length