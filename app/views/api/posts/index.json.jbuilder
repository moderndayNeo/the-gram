json.partial! "posts", posts: @posts

json.partial! "api/users/users", users: @users

json.partial! "api/comments/comments", comments: @comments

json.partial! "api/notifications/notifications", notifications: @notifications
