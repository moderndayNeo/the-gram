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
      render json: { success: ["Successfully logged in"] }, status: 200
    end
  end

  def destroy
  end
end
