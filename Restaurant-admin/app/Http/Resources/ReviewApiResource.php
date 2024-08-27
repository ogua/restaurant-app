<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewApiResource extends JsonResource
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
            'title' => $this->title,
            'body' => $this->body,
            'customer_service_rating' => $this->customer_service_rating,
            'quality_rating' => $this->quality_rating,
            'friendly_rating' => $this->friendly_rating,
            'rating' => $this->rating,
            'recommend' => $this->recommend,
            'approved' => $this->approved
        ];
    }
}
