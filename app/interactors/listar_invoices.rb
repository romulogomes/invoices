class ListarInvoices
  def initialize(owner_email:)
    @owner_email = owner_email
  end

  attr_reader :owner_email

  def executar
    Invoice.where(owner_email: owner_email) # FIXME: ROmulo - Paginação
  end
end
