# config valid only for current version of Capistrano
lock "3.18.1"
SSHKit.config.command_map[:bundle] = 'bundle _1.17.2_'

def deploysecret(key)
  @deploy_secrets_yml ||= YAML.load_file('config/deploy-secrets.yml')[fetch(:stage).to_s]
  @deploy_secrets_yml.fetch(key.to_s, 'undefined')
end

set :application, "erabaki"
set :repo_url, "git@github.com:ErabakiPamplona/erabaki.git"
set :user, deploysecret(:user)
set :puma_threads,    [4, 16]
set :puma_workers,    1

# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        false
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       deploysecret(:deploy_to)
set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub) }
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true  # Change to false when not using ActiveRecord

## Defaults:
set :scm,           :git
set :branch,        :master
set :format,        :pretty
set :log_level,     :debug
set :keep_releases, 5

## Linked Files & Directories (Default None):
set :linked_files, %w{config/database.yml config/secrets.yml}
set :linked_dirs,  %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/assets}
set :bundle_binstubs, nil

## Shared paths after Webpacker migration
set :linked_dirs, fetch(:linked_dirs, []).push(
  'storage',
  'tmp/webpacker-cache',
  'node_modules',
  'public/decidim-packs'
)

## Public/uploads
set :linked_dirs, fetch(:linked_dirs) + %w{public/uploads}

# Ensure the correct Gemfile is used
set :bundle_gemfile, -> { release_path.join('Gemfile') }

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end
  
  desc 'Start Puma'
  task :start do
    on roles(:app)do
      execute "cd #{current_path} && bundle exec puma -C #{shared_path}/puma.rb"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc "Make sure local git is in sync with remote."
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/master`
        puts "WARNING: HEAD is not the same as origin/master"
        puts "Run `git push` to sync changes."
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
  after  :finishing,    :restart
end

namespace :deploy do
  desc "Decidim webpacker configuration"
  task :decidim_webpacker_install do
    on roles(:all) do
      within release_path do
        execute :npm, "install"
      end
    end
  end

  before "deploy:assets:precompile", "deploy:decidim_webpacker_install"
end
