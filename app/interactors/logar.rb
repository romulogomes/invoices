class Logar
  def initialize(token:)
    @token = token
  end

  attr_reader :token

  def executar
    token_validado? ? 'login_valido' : 'login_invalido'
  end

  private

  def token_validado?
    Token.find_by(token: token, status: 'validado')
  end

end
