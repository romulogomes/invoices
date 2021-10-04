class InvoicesController < ApplicationController

  def listar
    @invoices = Invoice.where(owner_email: email_token) # FIXME ROmulo - Paginação

    render json: @invoices
  end

  def carregar
    invoice = Invoice.find(params[:id])
    # raise unless email_token == invoice.owner_email

    render json: invoice
  end

  def salvar
    invoice = Invoice.create!(
      number: params[:number],
      date: params[:date],
      company: params[:company],
      bill_to: params[:bill_to],
      total: params[:total],
      owner_email: email_token
    )
    enviar_emails(invoice.id) if params[:emails]

    render json: { id: invoice.id }
  end

  private

  # FIXME Romulo - Single responsibility
  def email_token 
    Jwt.decode(request.headers['token']).first['email'] 
  rescue
    raise 'Sem acesso'
  end

  def enviar_emails(id)
    params[:emails].each do |email|
      InvoiceMailer.enviar_email(id: id, email: email).deliver_now
    end
  end

end
