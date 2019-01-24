require 'httparty'
require 'json'
class UsersController < ApplicationController
  before_action :set_current_user, only: [:sign_out, :write_message]
  attr_accessor :current_user
  include HTTParty

  # getting all logged users
  def index
    @users = []
    User.all.each do |u|
      if u.online?
        @users.append({user: u, sign_in_at: u.attributes['current_sign_in_at']})
      end
    end

    render json: @users.to_json
  end

  # authorization api for google omniauth
  def get_authorization
    url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{params["id_token"]}"
    parsed_response = HTTParty.get(url).parsed_response
    @user = User.create_user_for_google(parsed_response)
    if !@user
      render json: { notice: 'user has already logged'}
    else
      set_headers(parsed_response)
      render json: {  user: {
                            name: @user['name'],
                            email: @user['email'],
                            image: @user['image'],
                            sign_in_at: @user.current_sign_in_at
                            }
                    }
      end
  end

  # sign_out function
  def sign_out
    @current_user.sign_out
    render json: { email: @current_user['email'] }
  end

  def write_message
    @current_user.comments.create(message: params['message']['message'])
    render json: { message: params['message']['message']}
  end
  private

  def set_current_user
    @current_user = User.find_by_email(params["email"])
  end

  def set_headers(parsed_response)
    headers['expire_at'] = parsed_response["exp"].to_s
  end
end
