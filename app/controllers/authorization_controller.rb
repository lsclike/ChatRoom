require 'httparty'
require 'json'
class AuthorizationController < ApplicationController
  include HTTParty

  def hello
    render json: { hello: 'world'}
  end

  def get_authorization
    url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{params["id_token"]}"
    byebug
    parsed_response = HTTParty.get(url).parsed_response
    @user = User.create_user_for_google(parsed_response)
    @user.save
    set_headers(parsed_response)
    render json: { status: 'Signed in successfully with google'}
  end

  private
  def set_headers(parsed_response)
    # headers['access-token'] = (tokens['access-token']).to_s
    # headers['client'] =  (tokens['client']).to_s
    # headers['expiry'] =  (tokens['expiry']).to_s
    # headers['uid'] =@user.uid
    # headers['token-type'] = (tokens['token-type']).to_s
    headers['expire_at'] = parsed_response["exp"].to_s
  end
end
