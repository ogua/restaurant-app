<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenusubmenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id ?? '',
            'photo' => $this->photo ?? '',
            'restaurant' => $this->menuitem->category->restaurant->name ?? '',
            'name' => $this->name,
            'currency' => 'GHC',
            'price' => number_format($this->price,2),
            'description' => $this->description
        ];
    }
}
