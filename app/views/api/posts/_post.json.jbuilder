json.extract! post, :id, :author_id, :caption, :location
json.image_url url_for(post.photo) if post.photo.attached?
