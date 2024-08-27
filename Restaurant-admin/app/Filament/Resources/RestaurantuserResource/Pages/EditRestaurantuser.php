<?php

namespace App\Filament\Resources\RestaurantuserResource\Pages;

use App\Filament\Resources\RestaurantuserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditRestaurantuser extends EditRecord
{
    protected static string $resource = RestaurantuserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
