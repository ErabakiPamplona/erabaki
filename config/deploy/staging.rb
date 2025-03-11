set :deploy_to, deploysecret(:deploy_to)
set :server_name, deploysecret(:server_name)
set :db_server, deploysecret(:db_server)
set :branch, ENV['branch'] || :staging
set :ssh_options, port: deploysecret(:ssh_port)
set :stage, :staging
set :rails_env, :production
set :default_env, { PATH: "#{deploysecret(:npm_path)}:/usr/local/bin:/usr/bin:/bin" }


server deploysecret(:server), user: deploysecret(:user), roles: %w(web app db importer cron)
