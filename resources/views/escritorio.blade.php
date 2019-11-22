@extends('layouts.app')
@section('content')
<script type = "text/javascript">
    const user = {!!$user!!}.data;
    const sidebar = {!!
        json_encode (
            [//get on user login, assign according to permissions
                [
                    'data'=> "0",
                    'disabled'=> false,
                    'title'=> "Escritorio",
                    'route'=> '',
                    'sub'=> []
                ],
                [
                    'data'=> "1",
                    'disabled'=> false,
                    'title'=> "Reservaciones",
                    'route'=> 'reservas',
                    'sub'=> []
                ],
                [
                    'data'=> "2",
                    'disabled'=> false,
                    'title'=> "Horarios",
                    'route'=> 'horarios',
                    'sub'=> [
                        [
                            'title'=> 'Feriados',
                            'to' => '/horarios/feriados',
                            'route'=> 'horarios/feriados',
                            'data'=> "0",
                            'class'=> "medium-left-padding box-transparent box-padding bold-hover full-width text-left"
                        ]
                    ]
                ],
                [
                    'data'=> "3",
                    'disabled'=> false,
                    'title'=> "Ubicaciones",
                    'route'=> 'ubicaciones',
                    'sub'=> []
                ],
                [
                    'data'=> "4",
                    'disabled'=> false,
                    'title'=> "Eventos",
                    'route'=> 'eventos',
                    'sub'=> []
                ],
                [
                    'data'=> "5",
                    'disabled'=> false,
                    'title'=> "Promociones",
                    'route'=> 'promociones',
                    'sub'=> []
                ],
                [
                    'data'=> "6",
                    'disabled'=> false,
                    'title'=> "Locales",
                    'route'=> 'locales',
                    'sub'=> []
                ],
                [
                    'data'=> "7",
                    'disabled'=> false,
                    'title'=> "Configuración",
                    'route'=> 'configuracion',
                    'sub'=> [
                        [
                            'title'=>"Establecimiento",
                            'to'=> '/configuracion/establecimiento',
                            'route'=>'configuracion',
                            'data'=>"0",
                            'class'=> "medium-left-padding box-transparent box-padding bold-hover full-width text-left"
                        ],
                        [
                            'title'=>"Usuario",
                            'to'=> '/configuracion/usuario',
                            'route'=>'configuracion',
                            'data'=>"1",
                            'class'=> "medium-left-padding box-transparent box-padding bold-hover full-width text-left"
                        ],
                        [
                            'title'=> "Reservas",
                            'to'=> '/configuracion/reservas',
                            'route'=>'configuracion',
                            'data'=> "2",
                            'class'=> "medium-left-padding box-transparent box-padding bold-hover full-width text-left"
                        ]
                    ]
                ],
                [
                    'data'=> "8",
                    'route'=> 'franquicias',
                    'disabled'=> false,
                    'title'=> "Franquicias",
                    'sub'=> []
                ]
            ]
        )
    !!};
</script>
    <div id="escritorio-container" class="relative full-width background-border full-height">
    </div>
</div>
@endsection
