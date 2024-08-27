<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuItemsApiResource extends JsonResource
{
    /**
    * Transform the resource into an array.
    *
    * @return array<string, mixed>
    */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->category->restaurant->id ?? '',
            'photo' => $this->category->restaurant->logo ?? '',
            'restaurant' => $this->category->restaurant->name ?? '',
            'name' => $this->name,
            'currency' => 'GHC',
            'price' => number_format($this->price,2),
            'description' => 'lorum ipsum'
        ];
    }
}
