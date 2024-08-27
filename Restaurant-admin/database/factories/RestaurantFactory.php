<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'logo' => $this->faker->imageUrl(),
            'name' => $this->faker->company(),
            'description' => $this->faker->text(),
            'region' => $this->faker->randomElement([
                'Ashanti Region', 
                'Western Region', 
                'Eastern Region', 
                'Central Region', 
                'Northern Region', 
                'Volta Region', 
                'Upper East Region', 
                'Upper West Region', 
                'Brong Ahafo Region', 
                'Western North Region', 
                'Oti Region', 
                'Bono Region', 
                'Bono East Region', 
                'Ahafo Region', 
                'Savannah Region', 
                'North East Region'
            ]),
            'location' => $this->faker->streetName(),
            'landmark' => $this->faker->randomElement(['Near Park', 'Next to Mall', 'Opposite Church', 'Opposite Filling Station']),
            'address' => $this->faker->streetAddress(),
            'phone' => $this->faker->phoneNumber(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
            'hours_of_operation' => $this->faker->randomElement(['9 AM - 9 PM', '10 AM - 10 PM', '24/7']),
            'payment_options' => $this->faker->word(),
            'lowest_price' => $this->faker->numberBetween(5, 50),
            'highest_price' => $this->faker->numberBetween(50, 200),
        ];
    }
}
