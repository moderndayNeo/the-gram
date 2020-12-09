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
end