json.partial! "api/notifications/notifications", notifications: @notifications

json.partial! "api/posts/posts", posts: @posts

json.partial! "api/users/users", users: @users

json.partial! "api/users/current_user", user: current_user