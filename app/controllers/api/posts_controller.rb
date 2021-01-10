class Api::PostsController < ApplicationController
  def index
    case params[:type]
    when "feed"
      followed_user_ids = current_user.followed_users.pluck(:id)
      followed_user_ids << current_user.id

      @posts = Post
        .where(author_id: [followed_user_ids])
        .limit(10)
        .newest_first
        .includes(:likes, :likers, :comments, :author)
        .with_eager_loaded_photo

      @post_ids, post_comment_ids, associated_user_ids = Post.get_associated_details(@posts)
      @comments = Comment
        .where(id: [post_comment_ids])
        .includes(:likes, :author)

      @users = User
        .where(id: [associated_user_ids])
        .with_eager_loaded_photo

      @current_user = current_user

      return render :index
    when "new_user"
      @posts = Post.limit(20).newest_first.includes(:comments)
      post_ids = @posts.pluck(:id)
      @comments = Comment.where(post_id: [post_ids])
      author_ids = []
      author_ids.concat(@comments.pluck(:author_id))
      author_ids.concat(@posts.pluck(:author_id))
      author_ids << current_user.id

      @users = User.where(id: [author_ids.uniq]).all

      return render :index
    else
      return render json: ["Error: No type provided to posts index"], status: 422
    end
  end

  def show
    @post = Post.find(params[:id])
    @user = @post.author
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
