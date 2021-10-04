class InvoicesController < ApplicationController

  def listar
    render json: ListarInvoices.new(owner_email: email_token).executar
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
      owner_email: email_token
    ).executar
    
    enviar_emails(invoice_id) if params[:emails]

    render json: { id: invoice_id }
  end

  def enviar
    if params[:emails] && params[:id]
      enviar_emails(params[:id]) 
      render json: { mensagem: 'email_enviado' }
    else
      render json: { mensagem: 'requisicao_invalida' }, status: :unprocessable_entity
    end
  end

  private

  # FIXME Romulo - Single responsibility
  def email_token 
    Jwt.decode(request.headers['token']).first['email'] 
  rescue
    raise 'Sem acesso'
  end

  # FIXME Romulo - Refactory 
  def enviar_emails(id)
    params[:emails].each do |email|
      InvoiceMailer.enviar_email(id: id, email: email).deliver_now
    end
  end

end
