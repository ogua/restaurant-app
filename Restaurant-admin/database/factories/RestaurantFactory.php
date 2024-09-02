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
            'logo' => $this->faker->randomElement([
                "https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://media.istockphoto.com/id/1319959946/photo/rows-of-restaurant-tables-and-chairs-in-gray-room.webp?a=1&s=612x612&w=0&k=20&c=xAQdExfsrD_ydVFaa9FMQJGiojCj-0nrnUMEyjaAKtE=",
                "https://images.unsplash.com/photo-1531973968078-9bb02785f13d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
                "https://plus.unsplash.com/premium_photo-1661875793803-92f4c8b6ae84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
                "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
                "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
                "https://images.unsplash.com/photo-1521917441209-e886f0404a7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
                "https://plus.unsplash.com/premium_photo-1670315264849-8cb4a1b1342e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
                "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
            ]),
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
