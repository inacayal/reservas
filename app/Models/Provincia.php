<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Provincia
 * 
 * @property int $id
 * @property string $nombre
 * 
 * @property \Illuminate\Database\Eloquent\Collection $users
 *
 * @package App\Models
 */
class Provincia extends Eloquent
{
	public $timestamps = false;

	protected $fillable = [
		'nombre'
	];

	public function users()
	{
		return $this->hasMany(\App\Models\User::class, 'id_provincia');
	}
}
