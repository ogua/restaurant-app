<?php

namespace Database\Factories;

use App\Models\Menuitem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuItemType>
 */
class MenuItemTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'name' => $selectedItem['name'],
            'photo' => $selectedItem['name'],
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween(10, 100),
            'menuitem_id' => Menuitem::factory(),
        ];
    }
}
