<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'company_id' => null, // Will be set by seeder
            'department_id' => null,
            'designation_id' => null,
            'role' => fake()->randomElement(['employee', 'manager', 'company_admin']),
            'phone' => fake()->phoneNumber(),
            'avatar' => null,
            'bio' => fake()->optional()->paragraph(),
            'social_links' => fake()->optional()->passthrough([
                'linkedin' => fake()->url(),
                'twitter' => fake()->url(),
                'website' => fake()->url(),
            ]),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the user is a super admin.
     */
    public function superAdmin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'super_admin',
            'company_id' => null,
        ]);
    }

    /**
     * Indicate that the user is a company admin.
     */
    public function companyAdmin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'company_admin',
        ]);
    }

    /**
     * Indicate that the user is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}
