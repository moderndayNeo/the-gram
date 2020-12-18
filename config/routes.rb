Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]

    resources :users, only: [:index, :show, :update, :create, :destroy] do
      resources :follows, only: [:create, :destroy]
    end

    resources :posts, only: [:create, :index, :show, :update, :destroy] do
      resources :likes, only: [:create, :destroy]
      resources :saves, only: [:create, :destroy]
    end
    
    resources :comments, only: [:create] do
      resources :likes, only: [:create, :destroy]
    end

    resources :notifications, only: [:index, :create]
    resources :hashtags, only: [:create]
    resources :taggings, only: [:create, :destroy]
  end

  root "static_pages#root"
end
