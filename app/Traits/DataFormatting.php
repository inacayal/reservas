<?php

namespace App\Traits;
use Illuminate\Support\Collection;
/**
 * managing data and dependency data format
 */
trait DataFormatting
{
    
	public static function getFormatOptions() {
		return self::$formatOptions;
	}

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
		Collection $data
	){
		$formattedData = collect([]);
		$formatOptions = self::getFormatOptions();
		$modelKeys = self::getModelKeys();
		$class = self::class;
		if (count($formatOptions)>0){
			foreach($formatOptions as $optKey=>$option){
				if (property_exists($class,'dataResource')){
					$data = call_user_func_array(
						self::getResource().'::collection',
						[$data]
					);
					$data = $data->collection;
				}
				$formattedData[$option] = call_user_func_array(
					$class.'::'.$optKey,
					[$data,$class,$modelKeys]
				);
			}
			return $formattedData;
		}
		return $data;
	}
}