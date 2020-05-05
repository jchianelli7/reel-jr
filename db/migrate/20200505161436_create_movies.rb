class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :year
      t.string :rated
      t.string :released
      t.string :runtime
      t.string :genre
      t.string :actors
      t.string :plot, null: false
      t.string :poster, default: 'https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_SX300.jpg'
      t.string :imdbId
      t.string :boxOffice
      t.string :director

      t.timestamps
    end
  end
end
