class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    @current_user = user
    session[:session_token] = user.reset_session_token
  end

  def logout
    current_user.reset_session_token
    session[:session_token] = nil
    @current_user = nil
  end

  def require_login
    unless current_user
      render json: ["Must log in to access this feature"], status: 403
    end
  end
end
