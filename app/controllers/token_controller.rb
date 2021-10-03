class TokenController < ApplicationController

  def gerar_token
    render json: { mensagem: 'email_ja_possui_token' } and return if email_ja_possui_token?

    salvar_token
    enviar_token_para_email
    render json: { mensagem: 'email_enviado' }
  end

  def logar
    if login_valido?
      render json: { mensagem: 'login_valido' }
    else
      render json: { mensagem: 'login_invalido' }
    end
  end

  private 

  def email_ja_possui_token? 
    Token.find_by(email: email) 
  end

  def email
    params[:email]
  end

  def token
    @token ||= Jwt.gerar(email)
  end

  def salvar_token
    Token.create({ email: email, token: token, status: 'aguardando_validacao' }).save
  end

  def enviar_token_para_email
    TokenMailer.enviar_token(email: email, token: token).deliver
  end

  def login_valido?
    Token.find_by(email: email, token: params[:token], status: 'validado')
  end

end
