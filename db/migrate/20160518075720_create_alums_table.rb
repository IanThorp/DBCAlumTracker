class CreateAlumsTable < ActiveRecord::Migration
  def change
  	create_table :alums do |t|
      t.string :name
      t.string :company
      t.string :compurl
      t.string :city
      t.string :state
      t.string :linkurl
      t.string :title
      t.string :bootcamp
      t.timestamps null: false
    end
  end
end
