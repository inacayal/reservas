<?php

namespace App\Traits;
use Illuminate\Support\Collection;
use App\User;
/**
 * managing data and dependency data format
 */
trait DataFormatting
{
    public static $formatOptions = [
        'group' => [
            'groupData'=>'data'
        ],
		'list' => [
			'listData'=>'list'
		],
		'key' => [
			'keyData'=>'data'
		],
		'all' => [
			'listData'=>'list',
			'keyData'=>'data'
        ]
    ];

	public static function getModelKeys(){
		return (object) [
			'key'=>self::$dataKey,
			'value'=>self::$valueKey
		];
	}

	public static function listCallback(
		$modelKeys
	) {
		return function ($item) use ($modelKeys) {
			return array(
				$item[$modelKeys->key] => $item[$modelKeys->value]
			);
		};
	}

    public static function listData(
		Collection $data,
		$model,
		$keys
	) {
		return $data->mapWithKeys(
			$model::listCallback($keys)
		);
	}
	
	public static function groupData(
		Collection $data,
		$model,
		$keys
    ) {
		return $data->groupBy($keys->key);
	}

	public static function keyData(
		Collection $data,
		$model,
		$keys
    ) {
		return $data->keyBy($keys->key);
	}

	public static function getResource(){
		return self::$dataResource;
	}

	public static function getFormattedData(
		$data,
		array $formatOptions
	){
		$formattedData = collect([]);
		$modelKeys = self::getModelKeys();
		$class = self::class;
		if (count($formatOptions)>0) {
			foreach($formatOptions as $optKey=>$option){
				$auxData = call_user_func_array(
					$class.'::'.$optKey,
					[$data,$class,$modelKeys]
				);
				if (property_exists($class,'dataResource') && $option!=='list'){
					$auxData = self::applyResource($auxData, self::getResource());
					$auxData = $auxData->collection;
				}
				$formattedData[$option] = $auxData;
			}
		} elseif(property_exists($class,'dataResource')) 
			$formattedData = self::applyResource($data, self::getResource());
		return $formattedData;
	}
	
	public static function applyResource ( $data, $resource ) {
		if ($data instanceof Collection ) 
			return call_user_func_array(
				$resource.'::collection',
				[$data]
			);
		else {
			return (new $resource($data))->toArray(request());
		}
	}
}