class Alum < ActiveRecord::Base
  
  validates :name, :company, :compurl, :city, :state, :linkurl, :bootcamp, presence: true


end