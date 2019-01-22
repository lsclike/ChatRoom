require 'httparty'
require 'json'
class UsersController < ApplicationController
  before_action :set_current_user, only: [:sign_out]
  attr_accessor :current_user
  include HTTParty
  def hello
    render json: { hello: 'world'}
  end

  def index
    @users = User.all
    render json: { users: @users}
  end

  def get_authorization
    url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{params["id_token"]}"
    parsed_response = HTTParty.get(url).parsed_response
    @user = User.create_user_for_google(parsed_response)
    set_headers(parsed_response)
    render json: { status: 'Signed in successfully with google'}
  end

  def sign_out
    ActionCable.server.broadcast('users', {test: 123})
    @current_user.sign_out
  end

  private

  def set_current_user
    @current_user = User.find_by_email(params["email"])
  end

  def set_headers(parsed_response)
    # headers['access-token'] = (tokens['access-token']).to_s
    # headers['client'] =  (tokens['client']).to_s
    # headers['expiry'] =  (tokens['expiry']).to_s
    # headers['uid'] =@user.uid
    # headers['token-type'] = (tokens['token-type']).to_s
    headers['expire_at'] = parsed_response["exp"].to_s
  end
end
