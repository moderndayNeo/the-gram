class Api::UsersController < ApplicationController
  # before_action :require_current_user!, except: [:create]

  def index
    # @users = User
    #   .all
    #   .includes(posts: [:likes, :photo_attachment, :likers])
    #   .includes(:photo_attachment, :liked_posts)

    case params[:type]
    when "explore"
      followed_users_ids = current_user.followed_users.pluck(:id)
      not_followed_users =
        User
          .where.not(id: followed_users_ids)
          .includes(
            :photo_attachment,
            :saves,
            :saved_posts,
            :follows,
            :liked_posts,
            :posts,
            :followers,
            :followed_users,
            :liked_comments
          )

      @users = not_followed_users
      render :index
    else
      render json: ["Error: Must pass a parameter when requesting users"], status: 422
    end
  end

  def show
    # @user = User.find(params[:id])
    # @posts = @user.posts
    # render :show

    # if @user.id !== current_user.id
    #     render json: { errors: "You cannot view another user's information" }, status: 401
    # else
    #     render :show
    # end

    # can render private user info if requested user id is current_user's id
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
    # Note, need to seed data before adding this condition.

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
