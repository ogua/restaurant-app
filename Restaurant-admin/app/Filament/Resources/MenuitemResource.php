<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MenuitemResource\Pages;
use App\Filament\Resources\MenuitemResource\RelationManagers;
use App\Models\Category;
use App\Models\Menuitem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MenuitemResource extends Resource
{
    protected static ?string $model = Menuitem::class;
    protected static ?int $sort = 2;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $modelLabel = 'Menu Item';
    protected static ?string $navigationLabel = 'Menu Items';
    protected static ?string $pluralModelLabel = 'Menu Items';
    protected static ?string $navigationGroup = 'Menu';

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
                        Forms\Components\Select::make('category_id')
                            ->required()
                            ->label('Category')
                            ->options(Category::pluck('name','id'))
                            ->preload()
                            ->live()
                            ->searchable(),
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Textarea::make('description')
                            ->columnSpanFull(),
                        Forms\Components\Hidden::make('price')
                            ->default(0),

                
                Forms\Components\Repeater::make('menuitems')
                ->relationship()
                    ->schema([
                        Forms\Components\FileUpload::make('photo')
                        ->image()
                        ->columnSpanFull(),
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->columnSpanFull()
                            ->maxLength(255),
                        Forms\Components\Hidden::make('category_id'),
                        Forms\Components\Textarea::make('description')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('price')
                        ->columnSpanFull()
                            ->default(0),
                    ])->columns(3)
                    ->columnSpanFull()
                    ->grid(2)
                    ->defaultItems(1)
                    ->addActionLabel('Add sub menu')
                    ->mutateRelationshipDataBeforeFillUsing(function (array $data,$get): array {
                        $data['category_id'] = $get("category_id");
                
                        return $data;
                    })
                     ->mutateRelationshipDataBeforeSaveUsing(function (array $data, $get): array {
                        $data['category_id'] = $get("category_id");
                
                        return $data;
                    }),

                


                ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo'),
                Tables\Columns\TextColumn::make('category.restaurant.name')
                    ->label('Restaurant')
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Category')
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                // Tables\Columns\TextColumn::make('price')
                //     ->money()
                //     ->sortable(),
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
            'index' => Pages\ListMenuitems::route('/'),
            'create' => Pages\CreateMenuitem::route('/create'),
            'edit' => Pages\EditMenuitem::route('/{record}/edit'),
        ];
    }
}
