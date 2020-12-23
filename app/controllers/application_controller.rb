class ApplicationController < ActionController::Base
  helper_method :current_user, :login_user!, :logout_current_user!, :logged_in?, :create_notification

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login_user!(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout_current_user!
    current_user.try(:ensure_session_token)
    session[:session_token] = nil
  end

  def logged_in?
    !current_user.nil?
  end

  def require_current_user!
    render json: { errors: ["You must be logged in"] }, status: 401 if current_user.nil?
  end

  def create_notification(props)
    n = Notification.new(props)
    n.source_user = current_user
    n.read = false

    case n.notifiable_type
    when "Like"
      n.message = "liked your photo"
    when "Follow"
      n.message = "started following you"
    end

    if n.save
      return true, n
    else
      return false, n
    end
  end
end

# n = Notification.new({
#   notified_user: User.last,
#   notifiable: Like.first,
#   source_post: nil,
#   source_comment: nil,
# })

# n.notifiable
# n.notified_user
# n.source_comment = source_comment if source_comment
# n.source_post = source_post if source_post

# note = Notification.new(
#   notifiable: Like.first,
#   notified_user: User.last,
#   source_user: User.first,
#   message: "liked your post",
#   read: false,
# )

# note = Notification.new(
#   notifiable: Like.first,
#   notified_user: User.last,
#   source_user: current_user,
#   message: "liked your post",
#   read: false,
# )

# note.save!
# return
