class TokenController < ApplicationController

  def gerar_token
    render json: { mensagem: 'email_ja_possui_token' } and return if email_ja_possui_token?

    token = GerarToken.new(email: params[:email]).executar
    render json: { mensagem: EnviarToken.new(token: token, email: params[:email]).executar }
  end

  def validar_token
    render json: { mensagem: ValidarToken.new(token: params[:token]).executar }
  end

  def logar
    render json: { mensagem: token_validado? ? 'login_valido' : 'login_invalido' }
  end

  private

  def email_ja_possui_token?
    Token.find_by(email: params[:email])
  end

  def token_validado?
    Token.find_by(token: params[:token], status: 'validado')
  end

end
