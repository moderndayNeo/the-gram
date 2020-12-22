class Notification < ApplicationRecord
  BOOLEANS = [true, false]
  validates :notifiable_id, presence: true
  validates :notified_user_id, presence: true
  validates :source_user_id, presence: true
  validates :message, presence: true
  validates :notifiable_type,
            presence: true,
            inclusion: { in: %w(Like Follow Comment) }
  validates :read,
    presence: true,
    inclusion: BOOLEANS

  validate :no_self_notifications

#   after_initialize :ensure_read_state

  belongs_to :notifiable, polymorphic: true

  belongs_to :notified_user,
             class_name: :User,
             foreign_key: :notified_user_id

  belongs_to :source_user,
             class_name: :User,
             foreign_key: :source_user_id

  belongs_to :source_post,
             class_name: :Post,
             foreign_key: :source_post_id,
             optional: true

  belongs_to :source_comment,
             class_name: :Comment,
             foreign_key: :source_comment_id,
             optional: true

  def read_notification
    self.read = true

    if self.save
      return self
    else
      return self.errors.full_messages
    end
  end

  private

  def no_self_notifications
    if self.notified_user == self.source_user
      errors[:user] << "cannot notify themself"
    end
  end

#   def ensure_read_state
#     self.read = false
#   end
end

=begin
Types of notifications:

1. 'Jacob liked your photo'
create the like, @like on @post
n.notifiable = @like
n.notified_user = @post.author
n.message = 'liked your photo'
n.source_post = @post
n.source_comment = NIL

notifiable_type: like, source_comment: nil, message => liked your post
---

2. 'Jacob started following you'
create the @follow
n.notifiable = @follow
n.notified_user = @follow.followee
n.message = 'started following you'
n.source_post = NIL
n.source_comment = NIL

# notifiable_type: follow, message => started following you
---

3. 'Jacob commented: hey man nice tattoo'
create the @comment on @post
n.notifiable = @comment
n.notified_user = @post.author
n.message = 'commented: #{comment.body}'
n.source_post = NIL
n.source_comment = @comment

# notifiable_type: comment, source_comment: comment, message => commented...
---

4. 'Ben liked your comment: "hey man nice tattoo"'
create the @like on @comment
n.notifiable = @like
n.notified_user = @comment.author
n.message = 'liked your comment: "#{comment.body}"'
n.source_post = NIL
n.source_comment = @comment

notifiable_type: like, source_comment: @comment, message => 'liked your comment...'
---

 n.source_user = current_user

case notifiable_type
when follow
    message = 'followed you'
when comment
    message = 'commented on your photo'
when like
    if source_comment
        'liked your comment'
    else
        'liked your photo'
    end

=end
