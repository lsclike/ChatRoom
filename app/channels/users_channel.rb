class UsersChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'users'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def all
    @users = User.all
    response = Hash.new
    response['number'] = @users.length
    ActionCable.server.broadcast('users', response)
  end
end
