json.extract! comment, :id, :author_id, :post_id, :body, :parent_comment_id

# json.num_likes comment.likes.count
# json.replies do
#     comment.replies.each do |reply|
#         json.partial! 'comment', comment: reply
#     end
# end
