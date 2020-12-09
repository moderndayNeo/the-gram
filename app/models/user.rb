class User < ApplicationRecord
  attr_reader :password

  validates :name, presence: true, uniqueness: true, length: { maximum: 30 }
  validates :username, presence: true, uniqueness: true, length: { maximum: 30 }
  validates :email, presence: true, uniqueness: true, length: { maximum: 254 }
  validates :bio, length: { maximum: 150 }
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true, message: "Password must be at least 6 characters long" }
  validates :session_token, presence: true, uniqueness: true

  after_initialize :ensure_session_token

  has_one_attached :photo


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
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end
