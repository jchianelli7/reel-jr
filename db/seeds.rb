
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'rest-client'

Movie.delete_all();

url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0ba073741ce62a3c7fb1fc3f627fb64a";
movies = RestClient.get(url)
movies_array = JSON.parse(movies)['results']

movies_array.each do |movie|
  title = movie['title']
  url_details = 'http://www.omdbapi.com?apikey=3c5fc75b&t='+title
  movie_details = movies = RestClient.get(url_details)
  movie = JSON.parse(movie_details)
  Movie.create(
      title: movie['Title'],
      year: movie['Year'],
      rated: movie['Rated'],
      released: movie['Released'],
      runtime: movie['Runtime'],
      genre: movie['Genre'],
      actors: movie['Actors'],
      plot: movie['Plot'],
      poster: movie['Poster'],
      imdbId: movie['imdbID'],
      boxOffice: movie['BoxOffice'],
      director: movie['Director']
  )
end