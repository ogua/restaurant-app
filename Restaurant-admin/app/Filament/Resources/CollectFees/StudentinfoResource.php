<?php

namespace App\Filament\Resources\CollectFees;

use App\Filament\Resources\CollectFees\StudentinfoResource\Pages;
use App\Filament\Resources\CollectFees\StudentinfoResource\RelationManagers;
use App\Models\CollectFees\Studentinfo;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class StudentinfoResource extends Resource
{
    protected static ?string $model = Studentinfo::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStudentinfos::route('/'),
            'create' => Pages\CreateStudentinfo::route('/create'),
            'view' => Pages\ViewStudentinfo::route('/{record}'),
            'edit' => Pages\EditStudentinfo::route('/{record}/edit'),
        ];
    }
}
