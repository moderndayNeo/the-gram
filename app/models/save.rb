class Save < ApplicationRecord
  validates :user_id, presence: true
  validates :post_id,
            presence: true,
            uniqueness: { scope: :user_id,
                          message: "Users can only save a post once" }

  belongs_to :user,
             class_name: :User,
             foreign_key: :user_id

  belongs_to :post,
             class_name: :Post,
             foreign_key: :post_id
end
