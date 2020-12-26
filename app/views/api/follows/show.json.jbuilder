json.partial! "api/users/users", users: [@followee, current_user]

# if @notification
#     json.notification do
#       json.partial! "api/notifications/notification", notification: @notification
#     end
#   end