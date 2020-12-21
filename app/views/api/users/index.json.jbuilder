json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! "user", user: user
    end
  end
end


# json.partial! 'api/posts/posts', posts: user.posts