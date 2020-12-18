class Api::CommentsController < ApplicationController
    def create
        @comment = Comment.new
        @comment.author = current_user

    end

end
