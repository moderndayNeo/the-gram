json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! "user", user: user
      json.partial! 'api/posts/posts', posts: user.posts
    end
  end
end