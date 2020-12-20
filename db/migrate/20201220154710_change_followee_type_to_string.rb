class ChangeFolloweeTypeToString < ActiveRecord::Migration[6.0]
  def change
    change_column :follows, :followee_type, :string
  end
end
