ExceptionNotification.configure do |config|
  config.ignored_exceptions += %w[
    ActionController::InvalidCrossOriginRequest
    ActionController::BadRequest
    ActionController::UnknownFormat
    Rack::QueryParser::InvalidParameterError
  ]
end
