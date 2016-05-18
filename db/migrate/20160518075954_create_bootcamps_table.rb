class CreateBootcampsTable < ActiveRecord::Migration
  def change
  	create_table :bootcamps do |t|
      t.string :name
      t.timestamps null: false
    end
  end
end
