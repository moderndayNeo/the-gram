class Api::NotificationsController < ApplicationController
  def index
    @notifications = current_user.notifications.newest_first.limit(30)
    @users = User.where(id: [@notifications.pluck(:source_user_id)])
    @posts = Post.where(id: [@notifications.pluck(:source_post_id)])
  end
end
