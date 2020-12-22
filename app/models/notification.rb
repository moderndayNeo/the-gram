class Notification < ApplicationRecord
  validates :notifiable_id, presence: true
  validates :notified_user_id, presence: true
  validates :source_user_id, presence: true
  validates :message, presence: true
  validates :notifiable_type,
            presence: true,
            inclusion: { in: %w(Like Follow Comment) }
  validates :read, inclusion: { in: [true, false] }
  validate :no_self_notifications

  after_initialize :ensure_source_user_and_read_state

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

  private

  def no_self_notifications
    if self.notified_user == self.source_user
      errors[:user] << "cannot notify themself"
    end
  end

  def ensure_source_user_and_read_state
    self.source_user = current_user
    self.read = false
  end
end
