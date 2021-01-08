class Post < ApplicationRecord
  has_one_attached :photo

  validates :author_id, presence: true
  validates :caption, length: { maximum: 2200 }
  validate :has_photo_attached
  scope :with_eager_loaded_photo, -> { eager_load(photo_attachment: :blob) }
  scope :newest_first, -> { order(created_at: :desc) }

  belongs_to :author,
             class_name: :User,
             foreign_key: :author_id

  has_many :likes, as: :likeable, dependent: :destroy

  has_many :likers,
    through: :likes,
    source: :liker

  has_many :comments,
           class_name: :Comment,
           foreign_key: :post_id,
           dependent: :destroy

  def self.get_associated_details(posts)
    post_comment_ids = []
    associated_user_ids = []
    post_ids = []

    posts.each do |post|
      post_ids << post.id

      associated_user_ids << post.author_id

      post.likes.each do |like|
        associated_user_ids << like.liker_id
      end

      post.comments.each do |comment|
        post_comment_ids << comment.id
        associated_user_ids << comment.author_id
      end
    end

    return post_ids, post_comment_ids, associated_user_ids
  end

  private

  def has_photo_attached
    if !self.photo.attached?
      errors[:post] << "must have a photo attached"
    end
  end

  def author_username
    self.author.username
  end
end
