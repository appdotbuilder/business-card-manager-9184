<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Designation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Designation>
 */
class DesignationFactory extends Factory
{
    protected $model = Designation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_id' => Company::factory(),
            'title' => fake()->randomElement([
                'Software Engineer',
                'Senior Developer',
                'Project Manager',
                'Product Manager',
                'Designer',
                'Marketing Manager',
                'Sales Representative',
                'HR Specialist',
                'Financial Analyst',
                'Operations Manager',
                'Customer Success Manager',
                'Data Analyst',
                'DevOps Engineer',
                'Quality Assurance Engineer',
                'Business Analyst'
            ]),
            'description' => fake()->paragraph(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the designation is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}