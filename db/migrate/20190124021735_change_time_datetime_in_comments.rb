class ChangeTimeDatetimeInComments < ActiveRecord::Migration[5.2]
  def change
    remove_column :comments, :created_at
    add_column :comments, :created_at, :datetime
  end
end
