# This migration comes from decidim_comments (originally 20170510091348)
class UpdateRootCommentableForComments < ActiveRecord::Migration[5.0]
  def up
    Decidim::Comments::Comment.where(depth: 0).update_all(
      "decidim_root_commentable_id = decidim_commentable_id, decidim_root_commentable_type = decidim_commentable_type"
    )

    Decidim::Comments::Comment.where("depth > 0").find_each do |comment|
      root = root_commentable(comment)
      # Avoid callbacks that expect update_comments_count on commentable types.
      comment.update_columns(
        decidim_root_commentable_id: root.id,
        decidim_root_commentable_type: root.class.name
      )
    end
  end

  def down
  end

  private

  def root_commentable(comment)
    return comment.commentable if comment.depth.zero?
    root_commentable comment.commentable
  end
end
