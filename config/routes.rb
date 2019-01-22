Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/api/auth', skip: [:omniauth_callbacks]
  post '/api/users/auth', to:'users#get_authorization'
  post 'api/users/sign_out' => 'users#sign_out'
  get '/api/users/hello', to: 'users#hello'
  mount ActionCable.server => '/cable'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
