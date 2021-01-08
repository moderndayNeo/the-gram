json.user do
  json.partial! "api/users/private_user", user: current_user
end
