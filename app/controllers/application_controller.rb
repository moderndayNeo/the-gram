class ApplicationController < ActionController::Base
  helper_method :current_user, :login_user!, :logout_current_user!, :logged_in?

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

    # n.notifiable = notifiable
    # n.notified_user = notified_user
    # n.source_comment = source_comment if source_comment
    # n.source_post = source_post if source_post

    n.message = message
    # case
    # case statement for message. handle message logic here

    if n.save
      return n
    else
      # # throw exception
      # render json: ["Error: Could not create notification"], status: 422
    end
  end
end

n = Notification.new({
  notified_user: User.last,
  notifiable: Like.first,
  source_post: nil,
  source_comment: nil,
})
