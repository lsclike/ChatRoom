class CommentsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'comments'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    @new_comment= Comment.new
    user = User.find_by_email(data['email'])
    @new_comment['user_id'] = user.id
    @new_comment['message'] = data['message']['message']
    @new_comment.save
    response = Hash.new
    response['message'] = data['message']['message']
    response['created_at'] = @new_comment.created_at
    response['image'] = user.image
    response['userName'] = user.name
    ActionCable.server.broadcast('comments', response)
  end
end
