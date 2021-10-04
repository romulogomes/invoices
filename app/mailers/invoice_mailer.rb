class InvoiceMailer < ApplicationMailer

  default :from => 'any_from_address@example.com'

  def enviar_email(id:, email:)
    @id = id
    @email = email
    @link_da_invoice = link_da_invoice(id)

    mail( :to => @email, :subject => 'Invoice' )
  end

  private 

  def link_da_invoice(id)
    "#{base}#{path}#{id}"
  end

  def path
    'app/invoice/details/'
  end

  def base
    'http://localhost:3001/'
  end

end
