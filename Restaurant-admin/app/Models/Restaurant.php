<?php

namespace App\Models;

use Codebyray\ReviewRateable\Contracts\ReviewRateable;
use Codebyray\ReviewRateable\Traits\ReviewRateable as TraitsReviewRateable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model implements ReviewRateable
{
    use HasFactory, TraitsReviewRateable;

    protected $guarded = ["id"];

    public function photos(){
        return $this->hasMany(Photos::class,"restaurant_id");
    }

    public function categories(){
        return $this->hasMany(Category::class,"restaurant_id");
    }
}
