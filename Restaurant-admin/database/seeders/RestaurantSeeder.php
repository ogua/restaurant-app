<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Photos;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        Restaurant::factory(50)
            ->hasPhotos(rand(5, 15))
            ->has(
                Category::factory()
                    ->count(rand(3, 8))
                    ->hasMenuItems(rand(5, 8))
            )
            ->create()
            ->each(function ($restaurant) use($user){
                for ($i = 0; $i < rand(5, 15); $i++) {
                    $restaurant->rating([
                        'title' => fake()->word(),
                        'customer_service_rating' => rand(1, 5),
                        'quality_rating' => rand(1, 5),
                        'friendly_rating' => rand(1, 5),
                        'pricing_rating' => rand(1, 5),
                        'rating' => rand(1, 5),
                        'body' => fake()->sentence(),
                        'recommend' => fake()->randomElement(['Yes', 'No']),
                        'approved' => true
                    ],$user);
                }
            });
          
    }
}
