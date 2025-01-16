<?php

namespace App\Filament\Resources\CollectFees\StudentinfoResource\Pages;

use App\Filament\Resources\CollectFees\StudentinfoResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListStudentinfos extends ListRecords
{
    protected static string $resource = StudentinfoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
