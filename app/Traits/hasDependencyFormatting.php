<?php

namespace App\Traits;
use Illuminate\Support\Collection;
/**
 * handle dependency formatting
 * must define @param dependency inside class indicating which models this instance depends on
 */
trait hasDependencyFormatting
{
	public static function getDependencies (
		string $type
	) {
		return self::$dependencies[$type];
	}

	public static function assignDependencyOptions (
		array $parameters,
		string $type
	){
		$dependencies = self::getDependencies($type);
		return (object) [
			'models'=> $dependencies,
			'data'=> self::assignOptions(
				$dependencies,
				$parameters
			)
		];
	}

	private static function assignOptions(
        array $dependencies,
        array $parameters
    ) {
        $res = [];
        foreach ($dependencies as $name=>$model)
        {
            if (method_exists($model,$name.'QueryCallback')){
                if (isset($parameters[$name]))
                    $res[$name] = call_user_func_array(
                        $model.'::'.$name.'QueryCallback',
                        $parameters[$name]
                    );
                else
                    $res[$name] = call_user_func(
                        $model.'::'.$name.'QueryCallback'
                    );
            }    
            else 
                array_push($res,$name);
        }
        return $res;
	}
}