# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# You can remove the 'faker' gem if you don't want Decidim seeds.

# Faker::Twitter fue eliminado en faker 3.x; stub para compatibilidad con seeds de Decidim 0.28
module Faker
  class Twitter
    def self.unique = self
    def self.screen_name = "user_#{SecureRandom.hex(6)}"
  end
end

Decidim.seed!
