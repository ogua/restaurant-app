<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItemType extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public function menuitem(){
        return $this->belongsTo(Menuitem::class,"menuitem_id");
    }
}
