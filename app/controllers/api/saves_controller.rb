class Api::SavesController < ApplicationController
  def create
    @save = Save.new
    @post = Post.find(params[:post_id])
    render json: ["Error: Post not found"], status: 404 unless @post
    @save.user = current_user
    @save.post = @post

    if @save.save
      render :show
    else
      render json: @save.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = Post.find(params[:post_id])
    render json: ["Error: Saved post not found"], status: 404 unless @post
    @save = Save.find_by(post: @post, user: current_user)
    render json: ["Error: Save not found"], status: 404 unless @save

    if @save.destroy
      @user = current_user
      render :show
    else
      render json: ["Couldn't unsave post"], status: 422 unless @save
    end
  end
end
