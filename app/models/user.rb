class User < ApplicationRecord
  validates :name, presence: true, uniqueness: true, length: { maximum: 30 }
  validates :username, presence: true, uniqueness: true, length: { maximum: 30 }
  validates :email, presence: true, uniqueness: true, length: { maximum: 254 }
  validates :bio, length: { maximum: 150 }
  validates :password_digest, presence: { message: 'Password can\t be blank' }
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, presence: true, uniqueness: true # perhaps no uniqueness validation require here

  after_initialize :ensure_session_token

  has_one_attached :photo

  has_many :posts,
           class_name: :Post,
           foreign_key: :author_id,
           dependent: :destroy

  attr_reader :password

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
end
