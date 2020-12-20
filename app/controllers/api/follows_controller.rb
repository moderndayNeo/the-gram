class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.new
    @follow.follower = current_user

    if params[:user_id]
      @user = User.find(params[:user_id])
      @follow.followee = @user
      @follow.save
      render :show
    elsif params[:hashtag_id]
      # code here
    else
      render json: ["Error: Could not create follow"], status: 422
    end
  end

  def destroy
  end
end
