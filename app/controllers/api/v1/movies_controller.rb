class Api::V1::MoviesController < ApplicationController
  def index
    movie = Movie.all.order(created_at: :desc)
    render json: movie
  end

  def create
    movie = Movie.create!(movie_params)
    if movie
      render json: movie
    else
      render json: movie.errors
    end
  end

  def show
    if movie
      render json: movie
    else
      render json: movie.errors
    end
  end

  def destroy
    # safe navigation operator &., which avoids nil errors when calling a method
    movie&.destroy
    render json: {message: 'Movie deleted!'}
  end

  private

  def movie_params
    params.permit(:title, :year, :rated, :released,
                  :runtime, :genre, :actors, :plot, :poster, :imdbId, :boxOffice, :director)
  end
end
