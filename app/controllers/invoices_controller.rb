class InvoicesController < ApplicationController

  def listar
    render json: ListarInvoices.new(owner_email: email_owner_token).executar
  end

  def carregar
    render json: CarregarInvoice.new(invoice_id: params[:id]).executar
  end

  def salvar
    invoice_id = SalvarInvoice.new(
      number: params[:number],
      date: params[:date],
      company: params[:company],
      bill_to: params[:bill_to],
      total: params[:total],
      owner_email: email_owner_token
    ).executar
    EnviarInvoicePorEmail.new(invoice_id: invoice_id, emails: params[:emails]).executar if params[:emails]
    render json: { id: invoice_id }
  end

  def enviar
    if params[:emails] && params[:id]
      EnviarInvoicePorEmail.new(invoice_id: params[:id], emails: params[:emails]).executar
      render json: { mensagem: 'email_enviado' }
    else
      render json: { mensagem: 'requisicao_invalida' }, status: :unprocessable_entity
    end
  end

  private

  def email_owner_token 
    Jwt.decode(request.headers['token']).first['email']
  rescue
    raise 'Sem acesso'
  end

end
