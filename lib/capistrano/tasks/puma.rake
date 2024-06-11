# lib/capistrano/tasks/puma.rake

namespace :puma do
  desc 'Start Puma'
  task :start do
    on roles(:app) do
      within current_path do
        with bundle_gemfile: current_path.join('Gemfile') do
          execute :bundle, :exec, :puma, '-C config/puma.rb'
        end
      end
    end
  end

  desc 'Stop Puma'
  task :stop do
    on roles(:app) do
      within current_path do
        with bundle_gemfile: current_path.join('Gemfile') do
          if test("[ -f #{shared_path}/tmp/pids/puma.state ]")
            execute :bundle, :exec, :pumactl, '-S', "#{shared_path}/tmp/pids/puma.state", 'stop'
          else
            info "Puma state file not found, skipping stop"
          end
        end
      end
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

