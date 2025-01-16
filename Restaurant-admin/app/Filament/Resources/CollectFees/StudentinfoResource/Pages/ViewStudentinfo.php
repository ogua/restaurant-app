<?php

namespace App\Filament\Resources\CollectFees\StudentinfoResource\Pages;

use App\Filament\Resources\CollectFees\StudentinfoResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewStudentinfo extends ViewRecord
{
    protected static string $resource = StudentinfoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
