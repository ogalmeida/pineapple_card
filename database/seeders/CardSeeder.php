<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Card;

class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $paymentDate = ['5', '10', '15'];
        $i = 0;

        foreach($users as $user){
            Card::create([
                'user_id' => $user->id,
                'score' => 0,
                'payment_date' => $paymentDate[$i++],
                'limit' => rand(5000, 10000),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}
