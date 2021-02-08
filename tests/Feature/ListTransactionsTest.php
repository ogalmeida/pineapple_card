<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;

class ListTransactionsTest extends TestCase
{
    /** @test */
    public function get_transactions_unauthenticated()
    {
        $response = $this->getJson('/api/transactions');

        $response->assertStatus(401);
    }

    /** @test */
    public function get_transaction_list_without_send_reference_date(){
        $loginInfo = $this->login();

        $response = $this->getJson('/api/transactions', ['Authorization' => "Bearer $loginInfo->access_token"]);

        $response->assertStatus(500);
    }

    /** @test */
    public function get_transaction_list_sending_reference_date(){
        $loginInfo = $this->login();

        $response = $this->getJson('/api/transactions?date=08/2020', ['Authorization' => "Bearer $loginInfo->access_token"]);

        $response->assertStatus(200);
    }

    /** @test */
    public function get_transaction_list_with_inexistent_card(){

        $user = User::first();
        $user->card()->update(['user_id' => 123]);

        $response = $this->postJson('/api/login', ['email' => $user->email, 'password' => 'password']);

        $loginInfo = $response->getData();

        $response = $this->getJson('/api/transactions?date=08/2020', ['Authorization' => "Bearer $loginInfo->access_token"]);

        $response->assertStatus(500);
    }
}
