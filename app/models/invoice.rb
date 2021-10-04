class Invoice < ApplicationRecord

  validates_presence_of :number, :date, :company, :bill_to, :total

  after_commit :generate_pdf

  private

  def generate_pdf
    return if previous_changes.key?('pdfmonkey_id')

    template_id = 'C5DE6D11-280A-443D-BBE0-93CFF095BCCE'
    data = {
      invoice_number: number,
      invoice_date: date,
      bill_to: bill_to,
      company: company,
      total: total
    }
    pdfmonkey_doc = Pdfmonkey::Document.generate!(template_id, data)
    update(pdfmonkey_id: pdfmonkey_doc.id) if pdfmonkey_doc.status == 'success'
  end
end
