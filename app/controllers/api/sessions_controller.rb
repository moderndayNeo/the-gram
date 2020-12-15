class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )

    if @user.nil?
      render json: ["Username or password is incorrect"], status: 404
    else
      login_user!(@user)
      @posts = @user.posts
      render :show
    end
  end

  def destroy
    logout_current_user!
    render json: ["Successfully signed out"], status: 200
  end
end
