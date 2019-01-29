class CommentsController < ApplicationController
  # @return => all comments with correspond user information in json format
  def index
    comments = Comment.all
    render json: comments.to_json(include: [:user])
  end
end
