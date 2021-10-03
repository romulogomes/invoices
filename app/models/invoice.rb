class Invoice < ApplicationRecord

  validates_presence_of :number, :date, :company, :bill_to, :total
end
