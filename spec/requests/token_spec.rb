require 'rails_helper'

RSpec.describe "Token", type: :request do
  describe "gerar_token" do
    let(:json){
      JSON.parse(response.body)
    }

    context 'sem token gerado previamente' do
      it do
        post '/gerar_token', params: { email: 'a@b.com' }
        
        expect(json).to eq("mensagem" => 'email_enviado')
        expect(response).to have_http_status(200)
      end

    end

    context 'com token já gerado' do
      before do
        Token.new({ email: 'a@b.com', token: '123', status: 'aguardando_validacao' }).save
      end

      it do
        post '/gerar_token', params: { email: 'a@b.com' }
        
        expect(json).to eq("mensagem" => 'email_ja_possui_token')
        expect(response).to have_http_status(200)
      end
    end

  end
end
