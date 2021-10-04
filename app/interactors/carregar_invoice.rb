class CarregarInvoice
  def initialize(invoice_id:)
    @invoice_id = invoice_id
  end

  attr_reader :invoice_id

  def executar
    invoice
    carregar_pdf
    retorno
  end

  private

  def invoice
    @invoice ||= Invoice.find(invoice_id)
  end

  def carregar_pdf
    @carregar_pdf ||= Pdfmonkey::Document.fetch(invoice.pdfmonkey_id)
  end

  def retorno
    invoice.as_json.merge(pdf_link: carregar_pdf.download_url)
  end

end
