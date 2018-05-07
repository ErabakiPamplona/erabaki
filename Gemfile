source "https://rubygems.org"

ruby '2.5.0'

gem "decidim", git: "https://github.com/decidim/decidim.git", :tag =>"v0.11.0"

gem 'puma'
gem 'uglifier', '~> 4.0'
gem 'faker'

group :development, :test do
  gem 'byebug', '~> 10.0', platform: :mri

  gem "decidim-dev", git: "https://github.com/decidim/decidim.git", :tag =>"v0.11.0"

end

group :development do
  gem 'web-console'
  gem 'listen', '~> 3.1.0'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'capistrano', require:false
  gem 'capistrano-rvm', require:false
  gem 'capistrano-rails', require:false
  gem 'capistrano-bundler', require:false
  gem 'capistrano3-puma', require:false
  gem 'capistrano-rails-console', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
