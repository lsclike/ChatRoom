Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/api/auth', skip: [:omniauth_callbacks]
  post 'auth/request', to:'authorization#get_authorization'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
