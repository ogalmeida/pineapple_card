<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();

        $this->artisan('migrate');
        $this->artisan('db:seed');

        $this->withoutExceptionHandling();
    }

    protected function login(){
        $user = User::first();

        $response = $this->postJson('/api/login', ['email' => $user->email, 'password' => 'password']);

        return $response->getData();
    }
}
