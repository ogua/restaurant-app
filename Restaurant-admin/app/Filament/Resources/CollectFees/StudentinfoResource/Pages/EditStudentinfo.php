<?php

namespace App\Filament\Resources\CollectFees\StudentinfoResource\Pages;

use App\Filament\Resources\CollectFees\StudentinfoResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditStudentinfo extends EditRecord
{
    protected static string $resource = StudentinfoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
