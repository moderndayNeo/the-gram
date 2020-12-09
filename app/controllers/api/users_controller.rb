class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update!(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])

    if !@user
      render json: { errors: ["User not found"] }, status: 404
    elsif @user.destroy
      render json: { success: ["User successfully deleted"] }, status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:name, :username, :email, :bio, :password, :photo)
  end
end
