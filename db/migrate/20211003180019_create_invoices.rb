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

#  Invoice.create(number: 1, date: '2020-09-09', company: 'Company', bill_to: 'Billto', total: 1, owner_email: 'a@a.com')