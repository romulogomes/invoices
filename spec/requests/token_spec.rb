require 'rails_helper'

RSpec.describe "Token", type: :request do
  let(:json) { JSON.parse(response.body) }
  
  let(:criar_token) { Token.create({ email: email, token: token, status: status }).save }
  let(:token) { 'token' }
  let(:email) { 'email@husky.com'}
  let(:status) { 'aguardando_validacao' }

  describe 'gerar_token' do
    
    context 'sem token gerado previamente' do
      it do
        post '/gerar_token', params: { email: email }
        
        expect(json).to eq("mensagem" => 'email_enviado')
        expect(response).to have_http_status(200)
      end

    end

    context 'com token já gerado' do
      before do
        criar_token
      end

      it do
        post '/gerar_token', params: { email: email }
  
        expect(json).to eq("mensagem" => 'email_ja_possui_token')
        expect(response).to have_http_status(200)
      end
    end

  end

  describe 'logar' do

    context 'login válido' do
      before do
        criar_token
      end

      let(:status) { 'validado' }

      it do
        post '/logar', params: { email: email, token: token }
        expect(json).to eq("mensagem" => 'login_valido')
      end

    end

    context 'login inválido' do
 
      context 'sem token' do
        it do
          post '/logar', params: { email: email }
          expect(json).to eq("mensagem" => 'login_invalido')
        end
      end

      context 'token invalido' do
        let(:status) { 'invalidado' }

        it do
          post '/logar', params: { email: email, token: token }
          expect(json).to eq("mensagem" => 'login_invalido')
        end
      end
    end
  end
  
end
