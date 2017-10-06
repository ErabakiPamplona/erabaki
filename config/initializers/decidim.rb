# -*- coding: utf-8 -*-
# frozen_string_literal: true
Decidim.configure do |config|
  config.application_name = "Erabaki Pamplona"
  config.mailer_sender    = "erabaki@pamplona.es"
  config.authorization_handlers = [CensusAuthorizationHandler]
  config.maximum_attachment_size = 150.megabytes
  # Uncomment this lines to set your preferred locales
  # config.available_locales = %i{en ca es}

  # Geocoder configuration
   config.geocoder = {
     static_map_url: "https://image.maps.cit.api.here.com/mia/1.6/mapview",
     here_app_id: Rails.application.secrets.geocoder[:here_app_id],
     here_app_code: Rails.application.secrets.geocoder[:here_app_code]
   }

  # Currency unit
  # config.currency_unit = "€"

  # The number of reports which an object can receive before hiding it
  # config.max_reports_before_hiding = 3
end
