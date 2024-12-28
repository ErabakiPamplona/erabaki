require_relative 'boot'

require "decidim/rails"
# Add the frameworks used by your app that are not loaded by Decidim.
 require "action_cable/engine"
# require "action_mailbox/engine"
# require "action_text/engine"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Erabaki
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.time_zone = "Europe/Madrid"
    #Cargar configuraciones por defecto de Rails 6.0
    config.load_defaults 6.0

    # Locales
    config.i18n.available_locales = %w(es eu)
    config.i18n.default_locale = :es
  end
end
