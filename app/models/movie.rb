class Movie < ApplicationRecord
  validates :title, presence: true
  validates :plot, presence: true
end
