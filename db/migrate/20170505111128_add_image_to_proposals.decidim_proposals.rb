# This migration comes from decidim_proposals (originally 20170411173215)
class AddImageToProposals < ActiveRecord::Migration[5.0]
  def change
    add_column :decidim_proposals_proposals, :image, :string
  end
end
