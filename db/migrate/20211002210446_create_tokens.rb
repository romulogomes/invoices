class CreateTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :tokens do |t|
      t.string :email
      t.string :token
      t.string :status

      t.timestamps
    end
  end
end
