class EnviarToken

  def initialize(token:, email:)
    @token = token
    @email = email
  end

  attr_reader :token, :email

  def executar
    enviar_token_por_email
    'email_enviado'
  end

  private 
  
  def enviar_token_por_email
    TokenMailer.enviar_token(email: email, token: token).deliver_now
  end
end