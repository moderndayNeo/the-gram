json.user do
    json.partial! "api/users/user", user: @user
end

json.partial! "api/posts/posts", posts: @posts

# json.partial! "api/users/user", user: @user