class ApplicationController < ActionController::API
 
  def requisicao_invalida
    render json: { mensagem: 'requisicao_invalida' }, status: :unprocessable_entity
  end

end
