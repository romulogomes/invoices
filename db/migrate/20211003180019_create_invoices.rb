class CreateInvoices < ActiveRecord::Migration[6.1]
  def change
    create_table :invoices do |t|
      t.integer :number
      t.date :date
      t.string :company
      t.string :bill_to
      t.string :total
      t.string :owner_email

      t.timestamps
    end
  end
end