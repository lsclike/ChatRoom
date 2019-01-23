class CommentsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'comments'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    response = Hash.new
    response['message'] = data['message']
    ActionCable.server.broadcast('comments', response)
  end
end
