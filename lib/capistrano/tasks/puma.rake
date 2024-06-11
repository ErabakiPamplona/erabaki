# lib/capistrano/tasks/puma.rake

namespace :puma do
  desc 'Start Puma'
  task :start do
    on roles(:app) do
      within current_path do
        execute :bundle, :exec, :puma, '-C config/puma.rb'
      end
    end
  end

  desc 'Stop Puma'
  task :stop do
    on roles(:app) do
      execute :pumactl, '-S', "#{shared_path}/tmp/pids/puma.state", 'stop'
    end
  end

  desc 'Restart Puma'
  task :restart do
    on roles(:app) do
      invoke 'puma:stop'
      invoke 'puma:start'
    end
  end
end

