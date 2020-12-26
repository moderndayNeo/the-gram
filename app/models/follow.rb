class Follow < ApplicationRecord
  validates :follower_id, presence: true
  validates :followee_id,
            presence: true,
            uniqueness: { scope: :follower_id,
                          message: "A user can only follow a certain user/hashtag once" }

  validates :followee_type, presence: true
  validate :not_following_self

  belongs_to :followee, polymorphic: true

  belongs_to :follower,
             class_name: :User,
             foreign_key: :follower_id

  # has_many :notifications,
  #          class_name: :Notification,
  #          foreign_key: :notifiable_id,
  #          dependent: :destroy

  after_destroy :destroy_notification

  private

  def not_following_self
    if self.follower === self.followee
      errors[:user] << "cannot follow themself"
    end
  end

  def destroy_notification
    n = Notification.find_by(notifiable_type: "Follow", notifiable_id: id)
    n.destroy() if n
  end
end
