json.extract! post, :id, :author_id, :caption, :location
json.image_url url_for(post.photo) if post.photo.attached?
json.author_username post.author.username
json.num_likes post.likes.length
json.liker_ids post.likers.pluck(:id)
json.time_ago time_ago_in_words(post.created_at)