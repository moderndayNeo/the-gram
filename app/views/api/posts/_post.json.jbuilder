json.extract! post, :id, :author_id, :caption, :location
json.image_url url_for(post.photo) if post.photo.attached?
json.author_username post.author.username
json.num_likes post.likes.length
json.liker_ids post.likes.pluck(:id)