class Api::EventsController < ApplicationController
  before_action :require_login
  before_action :ensure_current_user_is_authorized, only: [:update, :destroy]

  def index
    @events = current_user.events
    render :index
  end

  def create
    @event = Event.new(event_params)
    @event.user = current_user

    if @event.save
      render partial: "event", object: @event
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    @event = Event.find_by(id: params[:id])

    if @event.update(event_params)
      render partial: "event", object: @event
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def destroy
    @event = Event.find_by(id: params[:id])

    if @event.destroy
      render partial: "event", object: @event
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  private
  def event_params
    params.require(:event).permit(:title, :start, :ending, :location, :notes)
  end

  def ensure_current_user_is_authorized
    event = Event.find_by(id: params[:id])

    unless current_user == event.user
      render json: ["Unauthorized attempt to alter information"], status: 403
    end
  end
end
