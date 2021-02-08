<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class SetupEnviroment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'enviroment:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando utilizado para inicializar o ambiente de teste.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Running Migrate...');
        $this->call('migrate');
        $this->info('Running Seeds...');
        $this->call('db:seed');
        $this->info('Sync Invoices...');
        $this->call('invoice:sync');
        $this->info('Getting JWT Secret...');
        $this->call('jwt:secret');
        $this->comment('Finished.');
        $this->info('============== LOGIN INFO ================');
        $users = User::all();
        foreach($users as $user){
            $this->info('-------------------------');
            $this->info("email: $user->email");
            $this->info('senha: password');
            $this->info('-------------------------');
        }
        $this->info('==========================================');

    }
}
