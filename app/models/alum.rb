class Alum < ActiveRecord::Base

  belongs_to :bootcamp
  
  validates :name, :company, :compurl, :city, :state, :linkurl, :bootcamp_id, presence: true


end