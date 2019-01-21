class UsersChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'users'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
