class InvoicesController < ApplicationController

  def listar
    @invoices = Invoice.where(owner_email: email_token) # FIXME ROmulo - Paginação

    render json: @invoices
  end

  private

  def email_token
    Jwt.decode(request.headers['token']).first['email']
  rescue
    raise 'Sem acesso'
  end

end
