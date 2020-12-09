class Api::SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user.nil?
      render json: { errors: ["User not found"] }, status: 404
    else
      login_user!(user)
      render json: { success: ["Successfully signed in"] }, status: 200
    end
  end

  def destroy
    logout_current_user!
    render json: { success: ["Successfully signed out"] }, status: 200
  end
end
