<?php

namespace Database\Factories;

use App\Models\BusinessCard;
use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BusinessCard>
 */
class BusinessCardFactory extends Factory
{
    protected $model = BusinessCard::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'company_id' => Company::factory(),
            'slug' => Str::random(10),
            'template' => fake()->randomElement(['default', 'modern', 'classic', 'creative']),
            'colors' => [
                'primary' => fake()->hexColor(),
                'secondary' => fake()->hexColor(),
                'accent' => fake()->hexColor(),
            ],
            'custom_fields' => null,
            'is_default' => fake()->boolean(70), // 70% chance of being default
            'is_public' => fake()->boolean(80), // 80% chance of being public
            'views_count' => fake()->numberBetween(0, 500),
            'last_viewed_at' => fake()->optional()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the business card is the default card.
     */
    public function default(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_default' => true,
        ]);
    }

    /**
     * Indicate that the business card is public.
     */
    public function public(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_public' => true,
        ]);
    }

    /**
     * Indicate that the business card is private.
     */
    public function private(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_public' => false,
        ]);
    }
}