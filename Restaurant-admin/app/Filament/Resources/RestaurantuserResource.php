<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RestaurantuserResource\Pages;
use App\Filament\Resources\RestaurantuserResource\RelationManagers;
use App\Models\Restaurantuser;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RestaurantuserResource extends Resource
{
    protected static ?string $model = Restaurantuser::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $modelLabel = 'Restaurant User';
    protected static ?string $navigationLabel = 'Restaurant User';
    protected static ?string $pluralModelLabel = 'Restaurant Users';
    protected static ?string $navigationGroup = 'Settings';
    
    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Forms\Components\Section::make('')
            ->description('')
            ->schema([
                Forms\Components\FileUpload::make('photo')
                ->image()
                ->columnSpanFull(),
                Forms\Components\TextInput::make('full_name')
                ->required()
                ->maxLength(255),
                Forms\Components\TextInput::make('email')
                ->email()
                ->maxLength(255)
                ->default(null),
                Forms\Components\TextInput::make('phone')
                ->tel()
                ->maxLength(255)
                ->default(null),
                
                ])
                ->columns(2),
            ]);
        }
        
        public static function table(Table $table): Table
        {
            return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo'),
                Tables\Columns\TextColumn::make('full_name')
                ->searchable(),
                Tables\Columns\TextColumn::make('email')
                ->searchable(),
                Tables\Columns\TextColumn::make('phone')
                ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
                ])
                ->filters([
                    //
                    ])
                    ->actions([
                        Tables\Actions\EditAction::make(),
                        Tables\Actions\DeleteAction::make(),
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
                            'index' => Pages\ListRestaurantusers::route('/'),
                            'create' => Pages\CreateRestaurantuser::route('/create'),
                            'edit' => Pages\EditRestaurantuser::route('/{record}/edit'),
                        ];
                    }
                }
                