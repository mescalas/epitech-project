<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    protected $table = 'annonce';
    public $timestamps = true;

    protected $casts = [
        'prix' => 'float'
    ];

    protected $fillable = [
        'id_user',
        'title',
        'description',
        'prix'
    ];

    public function images(){
        return $this->hasMany(Images::class);
    }
}
