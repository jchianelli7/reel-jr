Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'movies/index'
      post 'movies/create'
      get '/show/:id', to: 'movies#show'
      delete '/destroy/:id', to: 'movies#destroy'
    end
  end
  root to: 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
