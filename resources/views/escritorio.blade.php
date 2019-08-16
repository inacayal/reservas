@extends('layouts.app')
@section('content')
<script type = "text/javascript">
    const sessionParameters = {!!$param!!};
    const sidebar = {!! 
        json_encode (
            [//get on user login, assign according to permissions
                [
                    'data'=> "0",
                    'disabled'=> false,
                    'title'=> "Escritorio",
                    'route'=> '/',
                    'sub'=> []
                ],
                [
                    'data'=> "1",
                    'disabled'=> false,
                    'title'=> "Reservaciones",
                    'route'=> '/reservas',
                    'sub'=> []
                ],
                [
                    'data'=> "2",
                    'disabled'=> false,
                    'title'=> "Horarios",
                    'route'=> '/horarios',
                    'sub'=> [
                        [
                            'title'=> 'Feriados',
                            'route'=> '/horarios/feriados',
                            'data'=> "0",
                            'class'=> "medium-left-padding box-transparent box-padding highlight-hover full-width text-left"
                        ]
                    ]
                ],
                [
                    'data'=> "3",
                    'disabled'=> false,
                    'title'=> "Ubicaciones",
                    'route'=> '/ubicaciones',
                    'sub'=> []
                ],
                [
                    'data'=> "4",
                    'disabled'=> false,
                    'title'=> "Eventos",
                    'route'=> '/eventos',
                    'sub'=> []
                ],
                [
                    'data'=> "5",
                    'disabled'=> false,
                    'title'=> "Locales",
                    'route'=> '/locales',
                    'sub'=> []
                ],
                [
                    'data'=> "6",
                    'disabled'=> false,
                    'title'=> "Configuración",
                    'route'=> '/configuracion',
                    'sub'=> [
                        [
                            'title'=> 'Encargado',
                            'route'=> '/configuracion/encargado',
                            'data'=> "0",
                            'class'=> "medium-left-padding box-transparent box-padding highlight-hover full-width text-left"
                        ],
                        [
                            'title'=>"Ubicacion",
                            'route'=> '/configuracion/ubicacion',
                            'data'=>"1",
                            'class'=> "medium-left-padding box-transparent box-padding highlight-hover full-width text-left"
                        ],
                        [
                            'title'=>"Contacto del local",
                            'route'=> '/configuracion/contacto',
                            'data'=>"2",
                            'class'=> "medium-left-padding box-transparent box-padding highlight-hover full-width text-left"
                        ],
                        [
                            'title'=>"Usuario",
                            'route'=> '/configuracion/usuario',
                            'data'=>"3",
                            'class'=> "medium-left-padding box-transparent box-padding highlight-hover full-width text-left"
                        ],
                        [
                            'title'=> "Reservas",
                            'route'=> '/configuracion/reservas',
                            'data'=> "4",
                            'class'=> "medium-left-padding box-transparent box-padding highlight-hover full-width text-left"
                        ]
                    ]
                ],
                [
                    'data'=> "7",
                    'route'=> '/franquicias',
                    'disabled'=> false,
                    'title'=> "Franquicias",
                    'sub'=> []
                ]
            ]
        )
    !!};
</script>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div id="escritorio-container" style="width:100%">
            </div>
        </div>
    </div>
</div>
@endsection
