class Follow < ApplicationRecord
  validates :follower_id, presence: true
  validates :followee_id,
            presence: true,
            uniqueness: { scope: :follower_id,
                          message: "A user can only follow a certain user/hashtag once" }

  validates :followee_type, presence: true

  belongs_to :followee, polymorphic: true

  belongs_to :follower,
             class_name: :User,
             foreign_key: :follower_id
end
