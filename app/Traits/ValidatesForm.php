<?php

namespace App\Traits;
use Illuminate\Support\Collection;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
/**
 * managing data and dependency data format
 */
trait ValidatesForm
{
    protected static $verbos = [
        'POST' => [
            'inf'=>'crear',
            'ger'=>'creado'
        ],
        'PUT'=>[
            'inf'=>'modificar',
            'ger'=>'modificado'
        ]
    ];

    public function validateForm($data,$model,$method) {
        $user = isset($data['id_usuario'])
            ? $data['id_usuario']
            : null;
        $validation = $user
            ? $model::validateData($user,$method)
            : [
                'rules' => [
                    'id_usuario' => 'bail|required|exists:users,id'
                ],
                'messages' => [
                    'id_usuario.required'   => 'No se ha indicado el usuario',
                    'id_usuario.exists'     => 'El usuario debe existir'
                ],
            ];

        return Validator::make(
            $data,
            $validation['rules'],
            $validation['messages']
        );
    }

    public function storeRelationData (array $data, $model){
        $relations = $model->getRelationNames();
        if (count($relations)>0) {
            foreach ($relations as $name) {
                $model->{$name}()->sync($data[$name]);
            };
        }
    }

    public function storeData($data,$method){
        $message = null;
        $instance = null;
        $model = $this->model;
        $validation = $this->validateForm($data,$this->model,$method);
        $title = self::$verbos[$method];

        if ($validation->fails()){
            $verb = $title['inf'];
            $message = [
                'type'=>'failure',
                'title'=>'Datos inválidos',
                'errors'=> $validation->errors(),
                'status'=> 422,
                'mensaje' => "Datos inválidos al $verb $model"
            ];
        } else {
            try {
                if ($method === 'POST'){
                    $instance = $this->model::create($data);
                } else {
                    $instance = $this->model::findOrFail($data['id']);
                    $instance->update($data);
                }
            } catch (\Exception $e) {
                $verb = $title['inf'];
                $message = [
                    'type'=>'failure',
                    'title'=> "Datos inválidos al $verb $model",
                    'status' => 400,
                    'errors'=> [],
                    'message' => $e->getMessage()
                ];
            } finally {
                if (is_null($message)){
                    $this->storeRelationData($data,$instance);
                    $verb = $title['ger'];
                    $message = [
                        'type'=>'success',
                        'title'=>'Éxito',
                        'status' => 200,
                        'errors'=> [],
                        'message' => "$model $verb exitosamente"
                    ];
                }
            }
        }
        return $message;
    }

    public function applyValidation (Request $request){
        $store = $this->storeData($request->post(),$request->getMethod());
        return response($store,$store['status']);
    }
}
