# frozen_string_literal: true

# This migration comes from decidim (originally 20201004160335)
# This file has been modified by `decidim upgrade:migrations` task on 2026-06-05 14:43:28 UTC
class RemoveNotificationsWithContinuityBadge < ActiveRecord::Migration[5.2]
  def up
    Decidim::Notification.where("extra->>'badge_name' =?", "continuity").delete_all
  end

  def down; end
end
