source "https://rubygems.org"

ruby '2.7.1'

DECIDIM_VERSION = { git: "https://github.com/decidim/decidim.git", branch:'release/0.24-stable' }


gem "decidim", DECIDIM_VERSION

gem 'puma', '>= 5.0.0'
gem 'uglifier', '~> 4.0'
gem 'faker'
gem 'exception_notification'

group :development, :test do
  gem 'byebug', '~> 11.0', platform: :mri

  gem "decidim-dev", DECIDIM_VERSION

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
