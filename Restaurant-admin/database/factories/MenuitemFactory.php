<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Menuitem>
 */
class MenuitemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'photo' => $this->faker->imageUrl(),
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween(10, 100),
            'category_id' => Category::factory(),
        ];
    }
}
