json.partial! "posts", posts: @posts

json.partial! "api/users/users", users: @users

json.partial! "api/comments/comments", comments: @comments

json.current_user do
    json.partial! "api/users/private_user", user: @current_user
end