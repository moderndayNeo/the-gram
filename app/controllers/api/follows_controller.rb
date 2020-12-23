class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.new
    @follow.follower = current_user

    case
    when params[:user_id]
      @followee = User.find(params[:user_id])
      @follow.followee = @followee
      if @follow.save
        valid, notification = create_notification({
          notified_user: @followee,
          notifiable: @follow,
          source_post: nil,
          source_comment: nil,
        })
        @notification = notification if valid
        render :show
      else
        render json: ["Error: Could not create follow"], status: 422
      end
    when params[:hashtag_id]
      # code here
    else
      render json: ["Error: You must follow either a user or a hashtag"], status: 422
    end
  end

  def destroy
    case
    when params[:user_id]
      @followee = User.find(params[:user_id])
      render json: ["Error: User not found"], status: 404 if !@followee
      @follow = Follow.find_by(followee: @followee, follower: current_user)
      render json: ["Error: User not already followed"], status: 404 if !@follow
      @follow.destroy!
      render :show
    when params[:hashtag_id]
      # code here
    else
      render json: ["Error: You must unfollow either a user or a hashtag"], status: 422
    end
  end
end
