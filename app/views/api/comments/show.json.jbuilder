json.post do
  json.partial! "api/posts/post", post: @post
end

json.comment do
  json.partial! "api/comments/comment", comment: @comment
end
