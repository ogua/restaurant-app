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
        $foodItems = [
    [
        'name' => "Burger",
        'photo' => "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww"
    ],
    [
        'name' => "Pizza",
        'photo' => "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8fDA%3D"
    ],
    [
        'name' => "Coffee",
        'photo' => "https://plus.unsplash.com/premium_photo-1673545518947-ddf3240090b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlfGVufDB8fDB8fHww"
    ],
    [
        'name' => "Salad",
        'photo' => "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhbGFkfGVufDB8fDB8fHww"
    ],
    [
        'name' => "Kebab",
        'photo' => "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
    ],
    [
        'name' => "Sushi",
        'photo' => "https://plus.unsplash.com/premium_photo-1668146927669-f2edf6e86f6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
    ],
    [
        'name' => "Tacos",
        'photo' => "https://plus.unsplash.com/premium_photo-1672976509033-cfc634f57047?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
    ],
    [
        'name' => "Soup",
        'photo' => "https://plus.unsplash.com/premium_photo-1668143363479-b8cd08698c0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
    ],
    [
        'name' => "Fries",
        'photo' => "https://images.unsplash.com/photo-1598679253597-adfd54b86fba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RnJpZXN8ZW58MHx8MHx8fDA%3D"
    ],
    [
        'name' => "Ice Cream",
        'photo' => "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8"
    ],
    // Continue adding other food items with corresponding photos...
];

        $selectedItem = $this->faker->randomElement($foodItems);
    
        return [
            'name' => $selectedItem['name'],
            'photo' => $selectedItem['name'],
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween(10, 100),
            'category_id' => Category::factory(),
        ];
    }
}
