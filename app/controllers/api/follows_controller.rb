class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.new
    @follow.follower = current_user

    if params[:user_id]
      @followee = User.find(params[:user_id])
      @follow.followee = @followee
    elsif params[:hashtag_id]
      # code here
    else
      render json: ["Error: You must follow either a user or a hashtag"], status: 422
    end

    if @follow.save
      render :show
    else
      render json: ["Error: Could not create follow"], status: 422
    end
  end

  def destroy
  end
end
