class Like < ApplicationRecord
  validates :likeable_id,
            presence: true

  validates :liker_id,
            presence: true,
            uniqueness: { scope: :likeable_id, message: "Users can only like something once" }

  validates :likeable_type,
            presence: true

  belongs_to :likeable, polymorphic: true

  belongs_to :liker,
             class_name: :User,
             foreign_key: :liker_id
end
