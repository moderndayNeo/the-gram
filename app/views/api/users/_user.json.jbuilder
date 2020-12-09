json.set! user.id do
    json.extract! user, :id, :name, :username, :email, :bio
end