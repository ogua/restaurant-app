<?php

namespace App\Filament\Resources\MenuitemResource\Pages;

use App\Filament\Resources\MenuitemResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMenuitems extends ListRecords
{
    protected static string $resource = MenuitemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
