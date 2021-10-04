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
    "#{base_url}#{path}?token=#{token}"
  end

  def path
    'login/'
  end

  def base_url
    BASE_URL
  end

end
