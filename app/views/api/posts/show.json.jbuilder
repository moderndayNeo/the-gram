json.post do
  json.set! @post.id do
    json.partial! "post", post: @post
  end
end