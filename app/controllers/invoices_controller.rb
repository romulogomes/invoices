class InvoicesController < ApplicationController

  def listar
    render json: ListarInvoices.new(owner_email: email_owner_token).executar
  end

  def carregar
    return requisicao_invalida unless params[:id]

    render json: CarregarInvoice.new(invoice_id: params[:id]).executar
  end

  def salvar
    invoice = SalvarInvoice.new(
      number: params[:number],
      date: params[:date],
      company: params[:company],
      bill_to: params[:bill_to],
      total: params[:total],
      owner_email: email_owner_token
    ).executar
    EnviarInvoicePorEmail.new(invoice_id: invoice.id, emails: params[:emails]).executar if params[:emails]
    render json: { id: invoice.id }
  end

  def enviar
    return requisicao_invalida unless params[:emails] && params[:id]

    EnviarInvoicePorEmail.new(invoice_id: params[:id], emails: params[:emails]).executar
    render json: { mensagem: 'email_enviado' }
  end

  private

  def email_owner_token 
    Jwt.decode(request.headers['token']).first['email']
  rescue
    raise 'Sem acesso'
  end

end
