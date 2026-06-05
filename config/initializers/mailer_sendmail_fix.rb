ActionMailer::Base.sendmail_settings[:arguments] = ['-i']

require 'mail/network/delivery_methods/sendmail'
Mail::Sendmail.prepend(Module.new do
  def initialize(values)
    values = values.merge(arguments: values[:arguments].split) if values[:arguments].is_a?(String)
    super(values)
  end
end)
