class Like < ApplicationRecord
  validates :likeable_id,
            presence: true,
            uniqueness: { scope: [:liker_id, :likeable_type], message: "Users can only like something once" }

  validates :liker_id,
            presence: true

  validates :likeable_type,
            presence: true

  belongs_to :likeable, polymorphic: true

  belongs_to :liker,
             class_name: :User,
             foreign_key: :liker_id

  # has_many :notifications, -> { where notifiable_type: :Like },
  #          class_name: :Notification,
  #          foreign_key: :notifiable_id,
  #          dependent: :destroy

           after_destroy :destroy_notification

           def destroy_notification
            n = Notification.find_by(notifiable_type: "Like", notifiable_id: id)
            n.destroy() if n
          end
end
