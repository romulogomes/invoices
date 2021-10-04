class GerarToken
  def initialize(email:)
    @email = email
  end

  attr_reader :email

  def executar
    salvar_token
    token
  end

  private

  def salvar_token
    Token.create({ email: email, token: token, status: 'aguardando_validacao' })
  end

  def token
    @token ||= Jwt.gerar(email)
  end

end
