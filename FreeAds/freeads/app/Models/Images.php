<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'annonce_id',
        'image'
    ];

    public function annonce(){
        return $this->belongsTo(Annonce::class);
    }

}
