Rails.application.routes.draw do
  post 'gerar_token', to: 'token#gerar_token'
  post 'logar', to: 'token#logar'
  post 'validar_token', to: 'token#validar_token' # FIXME Romulo token/

  post 'invoices/listar', to: 'invoices#listar'
  post 'invoice/carregar', to: 'invoices#carregar'
  post 'invoice/salvar', to: 'invoices#salvar'
  post 'invoice/enviar', to: 'invoices#enviar'
end
