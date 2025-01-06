source "https://rubygems.org"

ruby '3.1.1'

DECIDIM_VERSION = { git: "https://github.com/decidim/decidim.git", branch:'release/0.28-stable' }


gem "decidim", DECIDIM_VERSION

gem 'puma', '>= 6.3.1'
gem 'uglifier', '~> 4.0'
gem 'faker', '~> 3.2'
gem 'exception_notification'
gem 'social-share-button'

group :development, :test do
  gem 'byebug', '~> 11.0', platform: :mri

  gem "decidim-dev", DECIDIM_VERSION

end

group :development do
  gem 'web-console'
  gem 'listen', '~> 3.7'
  gem 'capistrano', '3.18.1', require:false
  gem 'capistrano-rvm', require:false
  gem 'capistrano-rails', require:false
  gem 'capistrano-bundler', require:false
  gem 'capistrano3-puma', require:false
  gem 'capistrano-rails-console', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
