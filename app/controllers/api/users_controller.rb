class Api::UsersController < ApplicationController
  # before_action :require_current_user!, except: [:create]

  def index
    case params[:type]
    when "explore"
      followed_users_ids = current_user.followed_users.pluck(:id)
      followed_users_ids << current_user.id

      not_followed_users =
        User
          .where.not(id: [followed_users_ids])
          .includes(:photo_attachment)
          .limit(30)

      @users = not_followed_users
      render :index
    when "followers"
      follower_ids = current_user.followers.pluck(:id)
      @users = User
        .where(id: follower_ids)
        .includes(:photo_attachment)

      render :index
    else
      render json: ["Error: Must pass a parameter when requesting users"], status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.associated_posts
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.username == "guest"
      return render json: ["The guest account cannot be edited"], status: 401
    elsif @user != current_user
      return render json: ["Users may only edit their own account"], status: 401
    end

    if params[:type] == "password"
      unless @user.is_password?(params[:old_password])
        return render json: ["Error: Incorrect password"], status: 401
      end

      @user.password = params[:new_password]
      if @user.save
        return render :show
      else
        return render json: @user.errors.full_messages, status: 422
      end
    end

    if @user.update!(user_params)
      render :show
    else
      return render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    # use 'user.destroy'  instead of 'user.delete'
    # 'user.destroy' will destroy the object, and also any :dependents
    @user = User.find(params[:id])

    if @user.username == "guest"
      return render json: ["The guest account cannot be deleted"], status: 401
    end

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
      .permit(:name, :username, :password, :email, :bio, :photo)
  end
end
