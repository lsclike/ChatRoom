# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, omniauth_providers: [:google_oauth2]
  include DeviseTokenAuth::Concerns::User
  has_many :comments, dependent: :destroy
  def self.create_user_for_google(data)
    where(uid: data["email"]).first_or_initialize.tap do |user|
      user.provider="google_oauth2"
      user.uid=data["email"]
      user.email=data["email"]
      user.name=data["name"]
      user.current_sign_in_at = Time.new
      user.password=Devise.friendly_token[0,20]
      user.password_confirmation=user.password
      user.save!
    end
  end

  def sign_out
    self.last_sign_in_at = Time.new
    self.save
  end

  def online?
    self.last_sign_in_at.present? ? self.current_sign_in_at > self.last_sign_in_at : true
  end
end
