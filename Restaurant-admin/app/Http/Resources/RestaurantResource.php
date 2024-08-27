<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'logo' => $this->logo,
            'name' => $this->name,
            'description' => $this->description,
            'address' => $this->address,
            'region' => $this->region,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'minprice' => $this->lowest_price,
            'phone' => $this->phone,
            'email' => $this->email,
            'hours' => $this->hours_of_operation,
            'rating' => (int) $this->averageRating(),
            'totalrating' => $this->countRating(),
            'menu' => CategoryApiResource::collection($this->categories),
            'photos' => PhotosApiResource::collection($this->photos),
            'reviews' => ReviewApiResource::collection($this->getAllRatings($this->id))
        ];
    }
}
