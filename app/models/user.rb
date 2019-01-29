# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, omniauth_providers: [:google_oauth2]
  include DeviseTokenAuth::Concerns::User
  has_many :comments, dependent: :destroy

  # create and save user information according data passed by users controller
  # @param: data => { UserEmail, UserName, UserPicture }
  # @return if the user is online  => return false
  # @return if the user has successfully saved => return user entity
  # @return error if there is any error occurred during the saving process
  def self.create_user_for_google(data)
    where(uid: data["email"]).first_or_initialize.tap do |user|
      if user.online?
        return false
      end
      user.provider="google_oauth2"
      user.uid=data["email"]
      user.email=data["email"]
      user.name=data["name"]
      user.image = data["picture"]
      user.current_sign_in_at = Time.new
      user.password=Devise.friendly_token[0,20]
      user.password_confirmation=user.password
      if user.save
        return user
      else
        render json: user.errors.to_json,
               status: :unprocessable_entity
      end
    end
  end

  # sign out action => update last_sign_in_at time
  def sign_out
    self.last_sign_in_at = self.current_sign_in_at
    self.save
  end

  # verify whether user is online or not
  def online?
    self.last_sign_in_at.present? ? self.current_sign_in_at > self.last_sign_in_at : true
  end
end
