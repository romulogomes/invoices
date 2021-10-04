class BuscarTokenPorEmail
  def initialize(email:)
    @email = email
  end

  attr_reader :email

  def executar
    Token.find_by(email: email)
  end

end