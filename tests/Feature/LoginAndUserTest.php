<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;

class LoginAndUserTest extends TestCase
{
    /** @test */
    public function login_user_correct_password()
    {
        $user = User::first();

        $response = $this->postJson('/api/login', ['email' => $user->email, 'password' => 'password']);

        $response->assertStatus(200);
    }

    /** @test */
    public function login_user_wrong_passord()
    {
        $user = User::first();

        $response = $this->postJson('/api/login', ['email' => $user->email, 'password' => '12345678']);

        $response->assertStatus(401);
    }



    /** @test */
    public function logout_with_token()
    {
        $loginInfo = $this->login();

        $response = $this->getJson('/api/auth/logout', ['Authorization' => "Bearer $loginInfo->access_token"]);

        $response->assertStatus(200);
    }

    /** @test */
    public function logout_without_token()
    {
        $response = $this->getJson('/api/auth/logout');

        $response->assertStatus(401);
    }
}
