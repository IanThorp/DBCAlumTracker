class Alum < ActiveRecord::Base

  belongs_to :bootcamp
  
  validates :name, :company, :compurl, :city, :state, :linkurl, :title, :bootcamp_id, presence: true


end