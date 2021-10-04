class ValidarToken
  def initialize(token:)
    @token = token
  end

  attr_reader :token

  def executar
    return 'token_invalido' unless token_a_ser_validado

    token_a_ser_validado.update(status: 'validado')
    'token_validado'
  end

  private

  def token_a_ser_validado
    @token_a_ser_validado ||= Token.find_by(token: token, status: 'aguardando_validacao')
  end

end
