class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :message
      t.time :created_at
      t.belongs_to :user, foreign_key: true
    end
  end
end
