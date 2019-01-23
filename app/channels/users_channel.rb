class UsersChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'users'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def login(data)
    response = Hash.new
    response['user'] = data['user']
    response['action'] = 'login'
    ActionCable.server.broadcast('users', response)
  end

  def sign_out(data)
    response = Hash.new
    response['email'] = data['email']
    response['action'] = 'sign_out'
    ActionCable.server.broadcast('users', response)
  end
end
