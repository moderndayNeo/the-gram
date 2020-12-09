json.users do
    @users.each do |user|
        json.partial! 'user', user: user       
    end
end
