<?php

namespace Database\Seeders;

use App\Models\BusinessCard;
use App\Models\Company;
use App\Models\Department;
use App\Models\Designation;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Super Admin
        $superAdmin = User::factory()->superAdmin()->create([
            'name' => 'Super Admin',
            'email' => 'admin@businesscard.app',
            'password' => Hash::make('password'),
        ]);

        // Create Companies
        $companies = Company::factory()->active()->count(3)->create();

        foreach ($companies as $company) {
            // Create departments for each company
            $departments = Department::factory()
                ->active()
                ->count(random_int(3, 5))
                ->create(['company_id' => $company->id]);

            // Create designations for each company
            $designations = Designation::factory()
                ->active()
                ->count(random_int(5, 8))
                ->create(['company_id' => $company->id]);

            // Create company admin
            $companyAdmin = User::factory()->companyAdmin()->active()->create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'password' => Hash::make('password'),
                'company_id' => $company->id,
                'department_id' => $departments->random()->id,
                'designation_id' => $designations->random()->id,
            ]);

            // Create managers
            $managers = User::factory()->active()->count(random_int(2, 4))->create([
                'role' => 'manager',
                'company_id' => $company->id,
                'department_id' => fn() => $departments->random()->id,
                'designation_id' => fn() => $designations->random()->id,
                'password' => Hash::make('password'),
            ]);

            // Create employees
            $employees = User::factory()->active()->count(random_int(8, 15))->create([
                'role' => 'employee',
                'company_id' => $company->id,
                'department_id' => fn() => $departments->random()->id,
                'designation_id' => fn() => $designations->random()->id,
                'password' => Hash::make('password'),
            ]);

            // Create business cards for all users in this company
            $allUsers = collect([$companyAdmin])->concat($managers)->concat($employees);
            
            foreach ($allUsers as $user) {
                BusinessCard::factory()
                    ->default()
                    ->public()
                    ->create([
                        'user_id' => $user->id,
                        'company_id' => $company->id,
                    ]);

                // Some users might have additional cards
                if (random_int(1, 100) <= 30) { // 30% chance
                    BusinessCard::factory()
                        ->public()
                        ->create([
                            'user_id' => $user->id,
                            'company_id' => $company->id,
                            'is_default' => false,
                        ]);
                }
            }
        }

        // Create test user
        $testUser = User::factory()->active()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'company_id' => $companies->first()->id,
            'department_id' => Department::where('company_id', $companies->first()->id)->first()->id,
            'designation_id' => Designation::where('company_id', $companies->first()->id)->first()->id,
        ]);

        // Create business card for test user
        BusinessCard::factory()
            ->default()
            ->public()
            ->create([
                'user_id' => $testUser->id,
                'company_id' => $companies->first()->id,
            ]);
    }
}