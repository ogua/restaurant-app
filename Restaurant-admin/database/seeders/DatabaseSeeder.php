<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        //DB::statement("ALTER TABLE `users` ADD COLUMN `region` VARCHAR(255) NULL AFTER `email`");
        User::factory()->adminUser()->create();
        User::factory()->regularUser()->create();

        $this->call([
            RestaurantSeeder::class
        ]);
    }
}
