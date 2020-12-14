json.user do
  json.partial! "user", user: @user
end

json.partial! "api/posts/posts", posts: @posts
