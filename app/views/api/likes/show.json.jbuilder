if @post
    json.post do
        json.partial! 'api/posts/post', post: @post
    end
# else
    # json.partial! 'api/comments/comment', comment: @comment
end