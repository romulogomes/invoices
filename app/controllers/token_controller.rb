class TokenController < ApplicationController

  def gerar_token
    render json: { mensagem: 'email_ja_possui_token' } and return if email_ja_possui_token?

    salvar_token
    enviar_token_para_email
    render json: { mensagem: 'email_enviado' }
  end

  def validar_token
    if token_a_ser_validado
      token_a_ser_validado.update(status: 'validado')
      render json: { mensagem: 'token_validado' }
    else
      render json: { mensagem: 'token_invalido' }
    end
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
    Token.create({ email: email, token: token, status: 'aguardando_validacao' })
  end

  def enviar_token_para_email
    TokenMailer.enviar_token(email: email, token: token).deliver_now
  end

  def token_a_ser_validado
    Token.find_by(token: params[:token], status: 'aguardando_validacao')
  end

  def login_valido?
    Token.find_by(token: params[:token], status: 'validado')
  end

end
