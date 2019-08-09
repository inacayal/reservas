<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models\Query;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Traits\crudMethods;

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
	//use CrudMethods;
	
	public $timestamps = false;
	protected $table = 'provincias';
	protected static $keyBy = false;
	protected $fillable = [
		'nombre'
	];
	public function users()
	{
		return $this->hasMany(\App\User::class, 'id_provincia');
	}

	private static $formatAsList = false;

	public static function needsListFormat() {
		return self::$formatAsList;
	}

	public static function isGroupable (){
		return self::$keyBy;
	}
}
