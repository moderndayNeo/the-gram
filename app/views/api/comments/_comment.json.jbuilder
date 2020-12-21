json.extract! comment, :id, :author_id, :post_id, :body, :parent_comment_id

json.author_username comment.author.username
json.time_ago time_ago_in_words(comment.created_at)
json.num_likes comment.likes.count
json.liker_ids comment.likes.pluck(:liker_id)
json.time_ago time_ago_in_words(comment.created_at)

# json.replies do
#     comment.replies.each do |reply|
#         json.partial! 'comment', comment: reply
#     end
# end
