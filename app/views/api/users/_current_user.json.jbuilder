json.current_user do
  json.partial! "api/users/private_user", user: user
end
