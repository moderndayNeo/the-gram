class User < ApplicationRecord
  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  attr_reader :password

  validates :name, presence: true, uniqueness: true, length: { maximum: 30 }
  validates :username, presence: true, uniqueness: true, length: { maximum: 30 }
  validates :email, presence: true, uniqueness: true, length: { maximum: 254 }
  validates :bio, length: { maximum: 150 }
  validates :password_digest, presence: { message: 'Password can\t be blank' }
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, presence: true, uniqueness: true
  validate :valid_email

  after_initialize :ensure_session_token

  has_one_attached :photo, dependent: :destroy
  scope :with_eager_loaded_photo, -> { eager_load(photo_attachment: :blob) }

  has_many :posts,
           class_name: :Post,
           foreign_key: :author_id,
           dependent: :destroy

  has_many :post_likes, -> { where likeable_type: "Post" },
    class_name: :Like,
    foreign_key: :liker_id

  has_many :liked_posts,
           through: :post_likes,
           source: :likeable,
           source_type: :Post

  has_many :comment_likes, -> { where likeable_type: "Comment" },
           class_name: :Like,
           foreign_key: :liker_id

  has_many :liked_comments,
           through: :comment_likes,
           source: :likeable,
           source_type: :Comment

  has_many :comments,
           class_name: :Comment,
           foreign_key: :author_id,
           dependent: :destroy

  has_many :follows, -> { where followee_type: "User" },
           class_name: :Follow,
           foreign_key: :followee_id

  has_many :followers, through: :follows, source: :follower

  has_many :outgoing_follows,
           class_name: :Follow,
           foreign_key: :follower_id

  has_many :followed_users,
           through: :outgoing_follows,
           source_type: :User,
           source: :followee

  # has_many :followed_hashtags,
  #     through: :outgoing_follows,
  #     source_type: :Hashtag,
  #     source: :followee

  has_many :saves,
           class_name: :Save,
           foreign_key: :user_id

  has_many :saved_posts, through: :saves, source: :post

  has_many :notifications,
      class_name: :Notification,
      foreign_key: :notified_user_id

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user if user && user.is_password?(password)
    nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def valid_email
    unless self.email =~ EMAIL_REGEX
      errors[:email] << "must be in a valid format"
    end
  end
end
