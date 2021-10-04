class EnviarInvoicePorEmail
  def initialize(invoice_id:, emails:)
    @invoice_id = invoice_id
    @emails = emails
  end

  attr_reader :invoice_id, :emails

  def executar
    emails.each do |email|
      InvoiceMailer.enviar_email(id: invoice_id, email: email).deliver_now
    end
  end
end
