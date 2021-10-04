class TokenController < ApplicationController

  def gerar_token
    render json: { mensagem: 'email_ja_possui_token' } and return if email_ja_possui_token?

    token = GerarToken.new(email: params[:email]).executar
    render json: { mensagem: EnviarToken.new(token: token, email: params[:email]).executar }
  end

  def validar_token
    return requisicao_invalida unless params[:token] 

    render json: { mensagem: ValidarToken.new(token: params[:token]).executar }
  end

  def logar
    return requisicao_invalida unless params[:token]

    render json: { mensagem: Logar.new(token: params[:token]).executar  }
  end

  private

  def email_ja_possui_token?
    Token.find_by(email: params[:email])
  end  

end
