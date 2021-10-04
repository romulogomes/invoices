class SalvarInvoice
  def initialize(number:, date:, company:, bill_to:, total:, owner_email:)
    @number = number
    @date = date
    @company = company
    @bill_to = bill_to
    @total = total
    @owner_email = owner_email
  end

  attr_reader :number, :date, :bill_to, :company, :total, :owner_email

  def executar
    Invoice.create!(
      number: number,
      date: date,
      company: company,
      bill_to: bill_to,
      total: total,
      owner_email: owner_email
    )
  end

end
