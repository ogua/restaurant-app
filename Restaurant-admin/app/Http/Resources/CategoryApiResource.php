<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'restaurant_id' => $this->restaurant_id,
            'category' => $this->name,
            'items' => MenuItemsApiResource::collection($this->menuitems)
        ];
    }
}
