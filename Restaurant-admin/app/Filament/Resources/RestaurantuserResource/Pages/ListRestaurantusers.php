<?php

namespace App\Filament\Resources\RestaurantuserResource\Pages;

use App\Filament\Resources\RestaurantuserResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListRestaurantusers extends ListRecords
{
    protected static string $resource = RestaurantuserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
