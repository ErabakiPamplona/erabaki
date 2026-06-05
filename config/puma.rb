shared_dir = ENV.fetch('PUMA_SHARED_DIR')
app_name   = ENV.fetch('PUMA_APP_NAME', 'erabaki')

threads_count = ENV.fetch('RAILS_MAX_THREADS', 5).to_i
threads threads_count, threads_count

environment ENV.fetch('RAILS_ENV') { 'production' }

bind       "unix://#{shared_dir}/tmp/sockets/#{app_name}-puma.sock"
pidfile    "#{shared_dir}/tmp/pids/puma.pid"
state_path "#{shared_dir}/tmp/pids/puma.state"
