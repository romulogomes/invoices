class InvoicesController < ApplicationController

  def listar
    @invoices = Invoice.where(owner_email: email_token) # FIXME ROmulo - Paginação

    render json: @invoices
  end

  def carregar
    invoice = Invoice.find(params[:id])
    # raise unless email_token == invoice.owner_email
    pdf = Pdfmonkey::Document.fetch(invoice.pdfmonkey_id)
    render json: invoice.as_json.merge(pdf_link: pdf.download_url)
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

  #Delete
  def gerar_pdf(invoice)
    template_id = 'C5DE6D11-280A-443D-BBE0-93CFF095BCCE'
    data = { 
      invoice_number: invoice.number,
      invoice_date: invoice.date,
      bill_to: invoice.bill_to,
      company: invoice.company,
      total: invoice.total
    }
    
    document = Pdfmonkey::Document.generate!(template_id, data)
    document.download_url if document.status == 'success'
  end
end
