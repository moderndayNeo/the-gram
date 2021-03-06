class Comment < ApplicationRecord
  validates :author_id, presence: true
  validates :post_id, presence: true
  validates :body, presence: true, length: { maximum: 300 }

  # Eager load oft-fetched associations:
  # author, likes, likers

  has_many :likes, as: :likeable

  has_many :replies,
           class_name: :Comment,
           foreign_key: :parent_comment_id,
           dependent: :destroy

  belongs_to :author,
             class_name: :User,
             foreign_key: :author_id

  belongs_to :parent_comment,
             class_name: :Comment,
             foreign_key: :parent_comment_id,
             optional: :true

  belongs_to :post,
             class_name: :Post,
             foreign_key: :post_id

  after_destroy :destroy_notification

  def destroy_notification
    n = Notification.find_by(notifiable_type: "Comment", notifiable_id: id)
    n.destroy() if n
  end
end
