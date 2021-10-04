require 'jwt'

SECRET_KEY = 'JIs$ecretK3y'.freeze

class Jwt

  def self.gerar(email)
    payload = { 
      email: email,
      date:  Time.now
    }
    JWT.encode payload, SECRET_KEY, 'HS256' 
  end

  def self.decode(token)
    JWT.decode(token, SECRET_KEY, true, { algorithm: 'HS256' })
  end
end