# config valid only for current version of Capistrano
lock "3.18.1"

def deploysecret(key)
  @deploy_secrets_yml ||= YAML.load_file('config/deploy-secrets.yml')[fetch(:stage).to_s]
  @deploy_secrets_yml.fetch(key.to_s, 'undefined')
end

set :application, "erabaki"
set :repo_url, "git@github.com:ErabakiPamplona/erabaki.git"
set :user, deploysecret(:user)

# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        false
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       deploysecret(:deploy_to)
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub) }

## Puma / systemd (capistrano3-puma 8)
set :puma_systemctl_user,    :user
set :puma_enable_lingering,  false
set :puma_service_unit_name, -> { "#{fetch(:application)}-puma" }
set :puma_service_unit_env_vars, -> {
  [
    "RAILS_ENV=#{fetch(:puma_env)}",
    "BUNDLE_GEMFILE=#{current_path}/Gemfile",
    "PUMA_SHARED_DIR=#{shared_path}",
    "PUMA_APP_NAME=#{fetch(:application)}"
  ]
}
set :puma_access_log,        -> { "#{shared_path}/log/puma.stdout.log" }
set :puma_error_log,         -> { "#{shared_path}/log/puma.stderr.log" }

## Defaults:
set :scm,           :git
set :branch,        :master
set :format,        :pretty
set :log_level,     :debug
set :keep_releases, 5

## Linked Files & Directories (Default None):
set :linked_files, %w{config/database.yml config/secrets.yml .env}
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

  desc 'Create directories for Puma'
  task :create_puma_dirs do
    on roles(:app) do
      execute "mkdir -p #{shared_path}/tmp/sockets #{shared_path}/tmp/pids"
    end
  end

  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
end

before 'puma:start', 'deploy:create_puma_dirs'

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

Rake::Task["deploy:assets:backup_manifest"].clear_actions
namespace :deploy do
  namespace :assets do
    task :backup_manifest do
    end
  end
end
