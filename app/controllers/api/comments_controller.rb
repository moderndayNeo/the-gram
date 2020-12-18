class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new
    @comment.author = current_user
    @post = Post.find(params[:post_id])
    @comment.post = @post
    @comment.body = params[:body]

    if @comment.save
      render :show
    else
      render json: ["Error: Couldn't create comment"], status: 422
    end
  end
end
