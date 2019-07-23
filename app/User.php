<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $id_franquicia
 * @property int $id_provincia
 * @property int $id_estado
 * @property string $nombre
 * @property string $razon_social
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property int $id_rol
 * @property string $created_at
 * @property string $email_verified_at
 * @property string $intervalo_reserva
 * @property string $correo_adm
 * @property string $telefono_adm
 * @property string $nombre_adm
 * @property string $caida_reserva
 * @property string $cuit_cuil
 * @property string $direccion
 * @property string $telefono_local
 * @property EstadoUsuario $estadoUsuario
 * @property User $user
 * @property Provincia $provincia
 * @property HorariosSemana[] $horariosSemanas
 * @property Reserva[] $reservas
 * @property Ubicacione[] $ubicaciones
 * @property UsuarioEvento[] $usuarioEventos
 * @property UsuarioFeriado[] $usuarioFeriados
 */
class User extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['id_franquicia', 'id_provincia', 'id_estado', 'nombre', 'razon_social', 'email', 'password', 'remember_token', 'id_rol', 'created_at', 'email_verified_at', 'intervalo_reserva', 'correo_adm', 'telefono_adm', 'nombre_adm', 'caida_reserva', 'cuit_cuil', 'direccion', 'telefono_local'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function estadoUsuario()
    {
        return $this->belongsTo('App\EstadoUsuario', 'id_estado');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User', 'id_franquicia');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function provincia()
    {
        return $this->belongsTo('App\Provincia', 'id_provincia');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function horariosSemanas()
    {
        return $this->hasMany('App\HorariosSemana', 'id_usuario');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reservas()
    {
        return $this->hasMany('App\Reserva', 'id_usuario');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ubicaciones()
    {
        return $this->hasMany('App\Ubicacione', 'id_usuario');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function usuarioEventos()
    {
        return $this->hasMany('App\UsuarioEvento', 'id_usuario');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function usuarioFeriados()
    {
        return $this->hasMany('App\UsuarioFeriado', 'id_usuario');
    }
}
