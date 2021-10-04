class TokenMailer < ApplicationMailer

  default :from => 'any_from_address@example.com'

  def enviar_token(email:, token:)
    @email = email
    @token = token
    @link_de_ativacao = link_de_ativacao(token)

    mail( :to => @email, :subject => 'Token de acesso' )
  end

  private 

  def link_de_ativacao(token)
    "#{base}?token=#{token}"
  end

  def base
    return 'https://invoices-six.vercel.app/' if Rails.env.production?

    'http://localhost:3001/login'
  end

end
