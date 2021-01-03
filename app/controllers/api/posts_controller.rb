class Api::PostsController < ApplicationController
  def index
    case params[:type]
    when "feed"
      @posts = Post
        .where(author_id: [current_user.associated_user_ids])
        .includes(:author, :likes, :likers)
        .with_eager_loaded_photo
        .newest_first

      @users = User
        .where(id: [current_user.associated_user_ids])
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

      # @posts = Post.all
      # @users = User.all

      @comments = Comment
        .where(post_id: [@posts.pluck(:id)])
        .includes(:author, :likes)

      @notifications = current_user.notifications.newest_first

      return render :index
    else
      return render json: ["Error: No type provided to posts index"], status: 422
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def create
    @post = Post.new(post_params)
    @post.author = current_user

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    @post = Post.find(params[:id])
    unless @post.author == current_user
      return render json: ["Only the post's creator can edit a post"], status: 401
    end

    if @post.update_attributes(post_params)
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = Post.find(params[:id])
    return render json: ["Post not found"], status: 404 if @post.nil?

    unless @post.author == current_user
      return render json: ["Only the post's creator can delete a post"], status: 401
    end

    if @post.destroy
      render json: ["Post successfully deleted"], status: 200
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  private

  def post_params
    params
      .require(:post)
      .permit(:author_id, :caption, :location, :photo)
  end
end
