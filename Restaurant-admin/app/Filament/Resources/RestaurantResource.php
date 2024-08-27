<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RestaurantResource\Pages;
use App\Filament\Resources\RestaurantResource\RelationManagers;
use App\Models\Restaurant;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RestaurantResource extends Resource
{
    protected static ?string $model = Restaurant::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $modelLabel = 'Restaurant';
    protected static ?string $navigationLabel = 'Restaurants';
    protected static ?string $pluralModelLabel = 'Restaurants';
    
    protected static ?int $sort = 1;
    
    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Forms\Components\Section::make('')
            ->description('')
            ->schema([
                Forms\Components\FileUpload::make('logo')
                ->image()
                ->columnSpanFull(),
                Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255),
                
                Forms\Components\Textarea::make('description')
                ->required()
                ->columnSpanFull(),
                
                Forms\Components\Select::make('region')
                ->required()
                ->options([
                    'Ashanti Region' => 'Ashanti Region',
                    'Western Region' => 'Western Region',
                    'Eastern Region' => 'Eastern Region',
                    'Central Region' => 'Central Region',
                    'Northern Region' => 'Northern Region',
                    'Volta Region' => 'Volta Region',
                    'Upper East Region' => 'Upper East Region',
                    'Upper West Region' => 'Upper West Region',
                    'Brong Ahafo Region' => 'Brong Ahafo Region',
                    'Western North Region' => 'Western North Region',
                    'Oti Region' => 'Oti Region',
                    'Bono Region' => 'Bono Region',
                    'Bono East Region' => 'Bono East Region',
                    'Ahafo Region' => 'Ahafo Region',
                    'Savannah Region' => 'Savannah Region',
                    'North East Region' => 'North East Region'
                    ])
                    ->searchable()
                    ->preload(),
                    
                    Forms\Components\TextInput::make('location')
                    ->required()
                    ->maxLength(255),
                    
                    Forms\Components\TextInput::make('landmark')
                    ->maxLength(255)
                    ->default(null),
                    
                    Forms\Components\Textarea::make('address')
                    ->columnSpanFull(),
                    
                    Forms\Components\TextInput::make('phone')
                    ->required()
                    ->maxLength(255),
                    
                    Forms\Components\TextInput::make('latitude')
                    ->numeric()
                    ->default(null),
                    
                    Forms\Components\TextInput::make('longitude')
                    ->numeric()
                    ->default(null),
                    
                    Forms\Components\Textarea::make('hours_of_operation')
                    ->required()
                    ->columnSpanFull(),
                    
                    Forms\Components\Textarea::make('payment_options')
                    ->required()
                    ->columnSpanFull(),
                    
                    Forms\Components\TextInput::make('lowest_price')
                    ->required()
                    ->numeric(),
                    
                    Forms\Components\TextInput::make('highest_price')
                    ->required()
                    ->numeric(),
                    
                    Forms\Components\Repeater::make('photos')
                    ->label('Add Photos')
                    ->relationship()
                    ->schema([
                        Forms\Components\FileUpload::make('photo')
                        ->image()
                        ->label('image'),
                        ])
                        ->columnSpanFull()
                        ->addActionLabel('Add Photo')
                        
                        
                        ])
                        ->columns(2),
                    ]);
                }
                
                public static function table(Table $table): Table
                {
                    return $table
                    ->columns([
                        Tables\Columns\ImageColumn::make('logo'),
                        Tables\Columns\TextColumn::make('name')
                        ->searchable(),
                        Tables\Columns\TextColumn::make('region')
                        ->searchable(),
                        Tables\Columns\TextColumn::make('location')
                        ->searchable(),
                        Tables\Columns\TextColumn::make('landmark')
                        ->searchable(),
                        Tables\Columns\TextColumn::make('latitude')
                        ->numeric()
                        ->sortable(),
                        Tables\Columns\TextColumn::make('longitude')
                        ->numeric()
                        ->sortable(),
                        Tables\Columns\TextColumn::make('lowest_price')
                        ->state(fn($record) => $record->lowest_price." - ".$record->highest_price)
                        ->sortable(),
                        // Tables\Columns\TextColumn::make('highest_price')
                        // ->numeric()
                        // ->sortable(),
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
                                Tables\Actions\ViewAction::make(),
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
                                    'index' => Pages\ListRestaurants::route('/'),
                                    'create' => Pages\CreateRestaurant::route('/create'),
                                    'edit' => Pages\EditRestaurant::route('/{record}/edit'),
                                ];
                            }
                        }
                        