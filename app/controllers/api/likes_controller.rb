class Api::LikesController < ApplicationController
  def create
    @like = Like.new
    @like.liker = current_user

    if params[:post_id]
      @post = Post.find(params[:post_id])
      render json: ["Error: Post not found"], status: 404 unless @post
      @like.likeable = @post
      @like.likeable_type = "post"
    elsif params[:comment_id]
      @comment = Comment.find(params[:comment_id])
      render json: ["Error: Comment not found"], status: 404 unless @comment
      @like.likeable_type = "comment"
    else
      render json: ["A like must be attached to either a post or a comment"], status: 422
    end

    @like.save!
  end

  def destroy
    if params[:post_id]
      @like = Like.find_by(likeable_id: params[:post_id], liker_id: current_user.id, likeable_type: "post")
      render json: ["Error: Like not found"] unless @like
      @like.destroy
    elsif params[:comment_id]
      @like = Like.find_by(likeable_id: params[:comment_id], liker_id: current_user.id, likeable_type: "comment")
      render json: ["Error: Like not found"] unless @like
      @like.destroy
    end
  end
end
