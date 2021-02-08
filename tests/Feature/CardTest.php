<?php

namespace Tests\Feature;

use Tests\TestCase;

class CardTest extends TestCase
{
    /** @test */
    public function get_user_and_card_information_with_token()
    {
        $loginInfo = $this->login();

        $response = $this->getJson('/api/auth/me', ['Authorization' => "Bearer $loginInfo->access_token"]);

        $response->assertStatus(200);
    }

    /** @test */
    public function get_user_and_card_information_without_token()
    {
        $response = $this->getJson('/api/auth/me');

        $response->assertStatus(401);
    }

    /** @test */
    public function get_user_and_card_information_without_wrong_token()
    {

        $response = $this->getJson('/api/auth/me', ['Authorization' => "Bearer laksdjf"]);

        $response->assertStatus(401);
    }

    /** @test */
    public function get_card_info_without_login(){
        $response = $this->getJson('/api/transactions/info');

        $response->assertStatus(401);
    }

    /** @test */
    public function get_card_info_with_login(){
        $loginInfo = $this->login();

        $response = $this->getJson('/api/transactions/info', ['Authorization' => "Bearer $loginInfo->access_token"]);

        $response->assertStatus(200);
    }
}
