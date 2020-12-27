json.user do
  json.partial! "api/users/user", user: current_user
end

json.post do
  json.partial! "api/posts/post", post: @post
end

if @comment
  json.comment do
    json.partial! "api/comments/comment", comment: @comment
  end
end