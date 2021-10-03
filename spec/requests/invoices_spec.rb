require 'rails_helper'

RSpec.describe "/invoices", type: :request do
  let(:json) { JSON.parse(response.body) }

  let(:valid_attributes) { {
    number: 1,
    date: '2021-09-09',
    company: 'COmpany',
    bill_to: 'Billto',
    total: 100,
    owner_email: owner_email
  } }
  let(:owner_email) { 'a@a.com' }

  let(:valid_headers) { {
    token: ApplicationController::Jwt.gerar('a@a.com') #FIXME Romulo
  } }

  let(:invoice) { Invoice.create! valid_attributes }

  describe "listar invoices do usuário" do
    it do
      invoice
      post '/invoices/listar', headers: valid_headers, as: :json # get
      expect(response).to be_successful
      expect(json.count).to eq(1)
    end
  end

  describe "carregar dados da invoice" do

    context 'invoice do usuário' do

      it do
        post '/invoice/carregar', params: { id: invoice.id }, headers: valid_headers, as: :json
        expect(json.then { 
          {
            number: _1['number'],
            owner_email: _1['owner_email'],
            company: _1['company'],
          }
        }).to eq({
          number:  1,
          owner_email: owner_email,
          company: 'COmpany'
        })
      end

    end

    context 'invoice de outro usuário' do

      let(:owner_email) { 'b@b.com' }

      it do
        expect {
          post '/invoice/carregar', params: { id: invoice.id }, headers: valid_headers, as: :json
        }.to raise_error(RuntimeError)
      end

    end

  end

  describe 'salvar invoice' do
    it do
      post '/invoice/salvar', params: valid_attributes, headers: valid_headers, as: :json
      expect(json['id']).to be_a_kind_of(Integer) 
    end
  end
end