class Api::LikesController < ApplicationController
  def create
    @like = Like.new
    @like.liker = current_user

    if params[:post_id] && !params[:comment_id]
      @post = Post.find(params[:post_id])
      return render json: ["Error: Post not found"], status: 404 unless @post
      @like.likeable = @post
      @like.save!
      render :show
    elsif params[:comment_id]
      @comment = Comment.find(params[:comment_id])
      @post = Post.find(params[:post_id])
      return render json: ["Error: Comment not found"], status: 404 unless @comment
      @like.likeable = @comment
      @like.save!
      render :show
    else
      render json: ["A like must be attached to either a post or a comment"], status: 422
    end
  end

  def destroy
    if params[:post_id] && !params[:comment_id]
      @like = Like.find_by(likeable_id: params[:post_id], liker_id: current_user.id, likeable_type: "Post")
      @post = Post.find(params[:post_id])
      return render json: ["Error: Like not found"] unless @like
      @like.destroy!
      render :show
    elsif params[:comment_id]
      @post = Post.find(params[:post_id])
      @like = Like.find_by(likeable_id: params[:comment_id], liker_id: current_user.id, likeable_type: "Comment")
      return render json: ["Error: Like not found"] unless @like
      @like.destroy!
      render :show
    end
  end
end
