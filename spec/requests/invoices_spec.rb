require 'rails_helper'

RSpec.describe '/invoices', type: :request do
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
    token: Jwt.gerar(owner_email)
  } }

  let(:invoice) { Invoice.create! valid_attributes }

  before do
    Struct.new('Document', :id, :status)
    allow(Pdfmonkey::Document).to receive(:generate!).and_return(Struct::Document.new('1', 'success'))
  end

  describe 'listar invoices do usuário' do
    it do
      invoice
      post '/invoices/listar', headers: valid_headers, as: :json # get
      expect(response).to be_successful
      expect(json.count).to eq(1)
    end
  end

  describe 'carregar dados da invoice' do
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
        company: 'COmpany',
      })
    end
  end

  describe 'salvar invoice' do
    it 'deve salvar invoice, enviar os emails e retornar o id' do
      expect {
        post '/invoice/salvar', params: valid_attributes.merge(emails: ['email@example.com', 'another@example.com']), headers: valid_headers
      }.to change { ActionMailer::Base.deliveries.count }.by(2)
      .and change { Invoice.count }.by(1)
    end
  end

  describe 'enviar invoice' do
    context 'requisição válida' do
      it do
        expect {
          post '/invoice/enviar', params: { id: invoice.id, emails: ['email@example.com', 'another@example.com'] }, headers: valid_headers
        }.to change { ActionMailer::Base.deliveries.count }.by(2)
      end
    end

    context 'requisição inváida' do
      it do
        post '/invoice/enviar', params: { emails: ['email@example.com', 'another@example.com'] }, headers: valid_headers
        expect(json).to eq('mensagem' => 'requisicao_invalida')
      end
    end
  end
end
