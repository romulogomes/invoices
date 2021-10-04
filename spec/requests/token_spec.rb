require 'rails_helper'

RSpec.describe "Token", type: :request do
  let(:json) { JSON.parse(response.body) }
  
  let(:criar_token) { Token.create({ email: email, token: token, status: status }) }
  let(:token) { 'token' }
  let(:email) { 'email@husky.com'}
  let(:status) { 'aguardando_validacao' }

  describe 'gerar token' do
    
    context 'sem token gerado previamente' do
      it do
        expect { post '/gerar_token', params: { email: email } }
          .to change { ActionMailer::Base.deliveries.count }.by(1)
          .and change { Token.count }.by(1)
        expect(json).to eq('mensagem' => 'email_enviado')
      end

    end

    context 'com token já gerado' do
      before do
        criar_token
      end

      it do
        post '/gerar_token', params: { email: email }
        expect(json).to eq('mensagem' => 'email_ja_possui_token')
      end
    end
  end

  describe 'validar token' do

    before do
      criar_token
    end

    context 'token válido' do

      it do
        post '/validar_token', params: { token: token }
        expect(json).to eq('mensagem' => 'token_validado')
      end

    end
 
    context 'token inválido' do
      let(:status) { 'invalido' }

      it do
        post '/validar_token', params: { token: token }
        expect(json).to eq('mensagem' => 'token_invalido')
      end

    end
  end

  describe 'logar' do

    before do
      criar_token
    end

    context 'login válido' do
      let(:status) { 'validado' }

      it do
        post '/logar', params: { token: token }
        expect(json).to eq('mensagem' => 'login_valido')
      end

    end

    context 'login inválido' do
 
      context 'token invalidado' do
        let(:status) { 'invalidado' }

        it do
          post '/logar', params: { token: token }
          expect(json).to eq('mensagem' => 'login_invalido')
        end
      end
    end
  end
end
