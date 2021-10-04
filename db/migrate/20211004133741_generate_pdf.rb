class GeneratePdf < ActiveRecord::Migration[6.1]
  def change
    add_column :invoices, :pdfmonkey_id, :string
  end
end
