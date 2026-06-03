# -*- coding: utf-8 -*-
# frozen_string_literal: true
Decidim.configure do |config|
  config.application_name = "Decide Pamplona"
  config.mailer_sender    = "decide@pamplona.es"
  config.maximum_attachment_size = 150.megabytes
  # Uncomment this lines to set your preferred locales
  config.available_locales = %i{es eu}
  config.default_locale = :es

  # Geocoder configuration
   config.geocoder = {
     static_map_url: "https://image.maps.hereapi.com/mia/v3/base/mc/overlay",
     here_api_key: Rails.application.secrets.geocoder[:here_api_key]
   }

  # Currency unit
  # config.currency_unit = "€"
  config.unconfirmed_access_for = 2.days
  config.enable_module(:templates)
  # The number of reports which an object can receive before hiding it
  # config.max_reports_before_hiding = 3
end

Decidim::Verifications.register_workflow(:census_authorization_handler) do |auth|
  auth.form = "CensusAuthorizationHandler"
end

# Inform Decidim about the assets folder
Decidim.register_assets_path File.expand_path("app/packs", Rails.application.root)

if Decidim.module_installed?(:verifications)
  Decidim::Verifications.configure do |c|
    c.document_types = Rails.application.secrets.dig(:verifications, :document_types).presence ||
                       %w(identification_number passport)
  end
end
