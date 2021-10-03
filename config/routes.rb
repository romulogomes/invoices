Rails.application.routes.draw do
  post 'gerar_token', to: 'token#gerar_token'
  post 'logar', to: 'token#logar'
  post 'validar_token', to: 'token#validar_token'
end
