<?php

namespace App\Traits;
/**
 * managing data and dependency data format
 */
trait ValidationMessages
{
	public static function setTimezone($date){
		$tz = new \DateTimeZone("America/Argentina/Buenos_Aires");
		date_timezone_set($date,$tz);
		return $date;
	}

    private static function getValidationMessages () {
        $date = self::setTimezone(date_create());
        $dateString = date_format($date,'Y-m-d H:i:s');
        return [
            "id.required_if" => "id requerido",
            "id.exists" => "recurso inexistente",
            "id.int" => "El id debe ser un entero positivo",
            "apertura_reserva.required_if"=> "Debes especificar una hora de apertura de reservas",
            "apertura_reserva.hora.required_if"=> "Debes especificar una hora de apertura de reservas",
            "apertura_reserva.hora.max"=> "La hora de apertura de reserva no puede exceder las 23 horas",
            "apertura_reserva.hora.min"=> "la hora de apertura de reserva no puede ser menor a 1",
            "apertura_reserva.hora.gte" => "Las reservas deben abrir después que el horario de atención",
            "apertura_reserva.minuto.required_if"=> "Debes especificar el minuto de apertura de reserva",
            "apertura_reserva.minuto.max"=> "Los minutos de apertura de reserva deben ser menores a 59",
            "apertura_reserva.minuto.min"=> "Los minutos de apertura de reserva no pueden ser menores a 0",
            "cierre_reserva.required_if"=> "Debes especificar una hora de cierre de reserva",
            "cierre_reserva.hora.required_if"=> "Debes especificar una hora de cierre de reserva",
            "cierre_reserva.hora.lte" => "Las reservas deben cerrar antes que el horario de atención",
            "cierre_reserva.hora.max"=> "La hora de cierre de reserva no puede exceder las 23 horas",
            "cierre_reserva.hora.min"=> "la hora de cierre de reserva no puede ser menor a 1",
            "cierre_reserva.minuto.required_if"=> "Debes especificar el minuto de cierre de reserva",
            "cierre_reserva.minuto.max"=> "Los minutos de cierre de reserva deben ser menores a 59",
            "cierre_reserva.minuto.min"=> "Los minutos de cierre de reserva no pueden ser menores a 0",
            "apertura_atencion.required_if"=> "Debes especificar una hora de apertura de atención",
            "apertura_atencion.hora.required_if"=> "Debes especificar una hora de apertura de atención",
            "apertura_atencion.hora.max"=> "La hora de apertura de atención no puede exceder las 23 horas",
            "apertura_atencion.hora.min"=> "la hora de apertura de atención no puede ser menor a 1",
            "apertura_atencion.minuto.required_if"=> "Debes especificar el minuto de apertura de atención",
            "apertura_atencion.minuto.max"=> "Los minutos de apertura de atención deben ser menos que 59",
            "apertura_atencion.minuto.min"=> "Los minutos de apertura de atención no pueden ser menores a 0",
            "cierre_atencion.required_if"=> "Debes especificar una hora de cierre de atención",
            "cierre_atencion.hora.required_if"=> "Debes especificar la hora de cierre de atención",
            "cierre_atencion.hora.max"=> "La hora de cierre de atención no puede exceder las 23 horas",
            "cierre_atencion.hora.min"=> "la hora de cierre de atención no puede ser menor a 1",
            "cierre_atencion.minuto.required_if"=> "Debes especificar el minuto de cierre de atención",
            "cierre_atencion.minuto.max"=> "Los minutos de cierre de atención deben ser menos que 59",
            "cierre_atencion.minuto.min"=> "Los minutos de cierre de atención no pueden ser menores a 0",
            "requestType.required" => "no se ha indicado el Tipo de operación",
            "requestType.in" => "El Tipo de operación no se encuentra entre los valores permitidos",
            "fecha_feriado.date"=> "el feriado debe ser una fecha",
            "fecha_feriado.after"=> "el feriado debe ser luego de la fecha actual: $dateString",
            "fecha_feriado.required"=> "Debes especificar una fecha",
            "fecha_feriado.date_format"=> "La fecha debe tener el formato AAAA-mm-dd",
            "nombre.required" => "Es necesario que ingreses el nombre",
            "nombre.max" => "El nombre no puede exceder los caracteres permitidos",
            "descripcion.required" => "Es necesario que ingreses la descripción",
            "descripcion.max" => "La descripción excede los caracteres permitidos",
            "eventos.required_if" => "Tienes que indicar algun evento",
            "eventos.array" => "Formato de eventos inválido",
            "eventos.exists" => "El evento no existe",
            'eventos.*' =>'El Evento debe ser de tipo numérico',
            "scope.required" => "es necesario que indiques si está activo",
            "scope.exists" => "el estado del feriado debe estar entre los disponibles",
            'promociones.array'	=> 'El tipo de las promociones es incorrecta',
            'promociones.exists' => 'Las Promociones deben ser creadas previamente',
            'promociones.int' => 'Las ID de las promociones deben ser numéricos',
            'feriados.array' => 'El tipo de Feriados es incorrecto',
            'feriados.exists' => 'Los Feriados deben ser creadas previamente',
            'horarios.array' => 'El tipo de Horario es incorrecto',
            'horarios.required_if' => 'Es necesario que el Evento este asociado a al menos un Horario en el momento de la creación',
            'horarios.exists' => 'Los Horarios deben ser creados previamente',
            'horarios.int' => 'Las ID de los horarios deben ser numéricos',
            'feriados.array' => 'El tipo de Feriados es incorrecto',
            'feriados.exists' => 'Los Feriados deben ser creados previamente',
            'feriados.int' => 'Las ID de los feriados deben ser numéricos',
            'id_usuario.exists' => 'El usuario no existe',
            'id_usuario.required' => 'No se ha indicado usuario',
            'feriados.*' => 'Los ID de los feriados deben ser enteros',
            'horarios.*' => 'Los ID de los horarios deben ser enteros',
            'promociones.*' => 'Los ID de las promociones deben ser enteros',
            'descuento.min' => 'El descuento no puede ser menor al 0%',
            'descuento.max' => 'El descuento no puede exceder el 100%',
            'id_usuario.required' => 'No se ha indicado el usuario',
            'id_usuario.exists' => 'El usuario debe existir',
            'id_estado.required' => 'No se ha indicado el estado',
            'id_estado.exists' => 'El estado debe existir',
            'id_estado.int' => 'el estado debe ser de tipo entero',
            'cantidad_maxima.required' => 'Es necesario que indiques La capacidad máxima de la ubicación',
            'cantidad_maxima.min' => 'La capacidad máxima debe ser de al menos una persona',
            'maximo_personas.required'  => 'Es necesario que indiques el máximo de personas por reserva',
            'maximo_personas.min'  => 'El máximo de personas por reserva debe ser mayor a 1',
            'email.email' => 'El email tiene un formato incorrecto',
            'email.required' => 'Es necesario que indiques una dirección de correo',
            'email.max' => 'El correo no puede tener más de 100 caracteres',
            'id_evento.int' => 'El Evento debe ser un número entero',
            'id_evento.exists' => 'El evento no ha sido creado previamente',
            'id_evento.required' => 'Tienes que indicar el evento de la reserva',
            'id_promocion.exists' => 'La promoción no ha sido creado previamente',
            'id_promocion.int' => 'la promoción debe ser numérica',
            'id_ubicacion.exists' => 'La ubicación no ha sido creado previamente',
            'id_ubicacion.int' => 'la ubicación debe ser numérica',
            'hora_reserva.required'=> "Debes especificar una hora de reserva",
            'hora_reserva.hora.required'=> "Debes especificar una hora de reserva",
            'hora_reserva.hora.max'=> "La hora de reserva no puede exceder las 23 horas",
            'hora_reserva.hora.min'=> "la hora de reserva no puede ser menor a 1",
            'hora_reserva.minuto.required'=> "Debes especificar un minuto de reserva",
            'hora_reserva.minuto.max'=> "Los minutos de la reserva deben ser menores a 59",
            'hora_reserva.minuto.min'=> "Los minutos de la reserva no pueden ser menores a 0",
            'dia_reserva.date'=> "el dia de reserva debe ser una fecha",
            'dia_reserva.after'=> "el dia de reserva debe ser luego de la fecha actual: $dateString",
            'dia_reserva.required'=> "Debes especificar un día de reserva",
            'cantidad_personas.required' => "Debes indicar la cantidad de personas de la reserva",
            'cantidad_personas.min' => "La reserva debete tener más de un participante",
            'id_dia_semana.required_if' => 'debes especificar a qué día de la semana pertenece el horario',
            'id_dia_semana.exists' => 'El día de la semana debe estar entre lunes y domingo (1-7)',
            'id_dia_semana.int' => 'Tipo de dato inválido',
            'id_dia_semana.not_in' => 'Ya agregaste un horario a este día de la semana',
            'feriados.*' => 'Los ID de los feriados deben ser enteros',
            'horarios.*' => 'Los ID de los horarios deben ser enteros',
            'promociones.*' => 'Los ID de las promociones deben ser enteros',
        ];
    }

    public function getRelationNames(){
      return $this->relationNames;
    }

    public static function validateData($request) {
		$data = (object) $request->post();
        $validation = call_user_func("self::validate$data->validationType",$request);
        $messages = self::getValidationMessages();
  		return [
			"rules" => $validation,
			"messages" => $messages
		];
	}
}
