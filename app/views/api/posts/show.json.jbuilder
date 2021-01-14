json.post do
    json.partial! "post", post: @post
end

if @user
    json.user do
        json.partial! "api/users/user", user: @user
    end
end