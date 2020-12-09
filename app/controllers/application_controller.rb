class ApplicationController < ActionController::Base
  helper_method :current_user, :login_user!, :logout_current_user!

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
end
