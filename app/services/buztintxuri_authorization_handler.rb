# frozen_string_literal: true
# Checks the authorization against the census to verify residence in Buztintxuri.
require "digest/md5"

# This class performs a check against the official census database in order
# to verify the citizen's residence in the Buztintxuri neighbourhood.
class BuztintxuriAuthorizationHandler < Decidim::AuthorizationHandler
  include ActionView::Helpers::SanitizeHelper

  attribute :document_number, String
  attribute :document_type, Symbol
  attribute :postal_code, String
  attribute :date_of_birth, Date

  validates :date_of_birth, presence: true
  validates :document_type, inclusion: { in: %i(dni nie passport) }, presence: true
  validates :document_number, format: { with: /\A[A-z0-9]*\z/ }, presence: true
  validates :postal_code, presence: true, format: { with: /\A[0-9]*\z/ }

  validate :document_type_valid
  validate :over_16

  def self.from_params(params, additional_params = {})
    instance = super(params, additional_params)

    params_hash = hash_from(params)

    if params_hash["date_of_birth(1i)"]
      date = Date.civil(
        params["date_of_birth(1i)"].to_i,
        params["date_of_birth(2i)"].to_i,
        params["date_of_birth(3i)"].to_i
      )

      instance.date_of_birth = date
    end

    instance
  end

  def census_document_types
    %i(dni nie passport).map do |type|
      [I18n.t(type, scope: "decidim.buztintxuri_authorization_handler.document_types"), type]
    end
  end

  def unique_id
    Digest::MD5.hexdigest(
      "#{document_number}-#{ENV.fetch('SECRET_KEY_BASE')}"
    )
  end

  private

  def sanitized_document_type
    case document_type&.to_sym
    when :dni
      "01"
    when :passport
      "02"
    when :nie
      "03"
    end
  end

  def sanitized_date_of_birth
    @sanitized_date_of_birth ||= date_of_birth&.strftime("%Y%m%d")
  end

  def document_type_valid
    return nil if response.blank?

    respuesta = response["respuesta"]
    codiError = response["codigoError"]

    begin
      Rails.logger.info("[CENSUS_VERIFY] resp=#{respuesta.inspect} cod=#{codiError.inspect} cp=#{postal_code.inspect} tipo=#{document_type.inspect} uid=#{unique_id.inspect}")
    rescue StandardError => e
      Rails.logger.error("[CENSUS_VERIFY] logging failed: #{e.class}: #{e.message}")
    end

    return nil if respuesta == true || respuesta == "true"

    case codiError
    when 1
      errors.add(:document_number, I18n.t("buztintxuri_authorization_handler.invalid_document"))
    when 2
      errors.add(:postal_code, I18n.t("buztintxuri_authorization_handler.invalid_postal_code"))
    when 3
      errors.add(:date_of_birth, I18n.t("buztintxuri_authorization_handler.invalid_date_of_birth"))
    else
      errors.add(:handler_name, I18n.t("buztintxuri_authorization_handler.invalid_something"))
    end
  end

  def response
    return nil if document_number.blank? ||
                  document_type.blank? ||
                  postal_code.blank? ||
                  date_of_birth.blank?

    return @response if defined?(@response)

    conn = Faraday.new(ssl: { verify: false })
    response ||= conn.get(ENV.fetch('CENSUS_BUZTINTXURI_URL')) do |req|
      req.headers['Content-Type'] = 'application/xml'
      req.body = request_body
    end

    @response ||= JSON.parse(response.body)
  end


  def request_body
    @request_body ||= <<EOS
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://es.bcn.mci.ws/cr/schemas">
  <soapenv:Header/>
  <soapenv:Body>
    <sch:GetPersonaLocalitzaAdrecaRequest>
      <sch:usuari>PAM</sch:usuari>
      <sch:Dades>
        <sch:tipDocument>#{sanitized_document_type}</sch:tipDocument>
        <sch:docId>#{sanitize document_number&.upcase}</sch:docId>
        <sch:codiPostal>#{sanitize postal_code}</sch:codiPostal>
        <sch:dataNaixConst>#{sanitized_date_of_birth}</sch:dataNaixConst>
        <sch:email>#{user.email}</sch:email>
        <sch:autorizacion>#{handler_name}</sch:autorizacion>
      </sch:Dades>
    </sch:GetPersonaLocalitzaAdrecaRequest>
  </soapenv:Body>
</soapenv:Envelope>
EOS
  end

  def over_16
    errors.add(:date_of_birth, I18n.t("buztintxuri_authorization_handler.age_under_18")) unless age && age >= 16
  end

  def age
    return nil if date_of_birth.blank?

    now = Date.current
    extra_year = (now.month > date_of_birth.month) || (
      now.month == date_of_birth.month && now.day >= date_of_birth.day
    )

    now.year - date_of_birth.year - (extra_year ? 0 : 1)
  end

end
