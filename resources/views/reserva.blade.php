<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <!-- Styles -->
        <link href="{{ asset('css/styles.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('fontawesome-free-5.9.0-web/css/all.css') }}" rel="stylesheet"/>
    </head>
    <body>
        <div class="flex flex-column v-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/escritorio') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                    @endauth
                </div>
            @endif
            <div class="content align-center" id="reserva-container"></div>
        </div>
    </body>
    <script src="{{asset('js/app.js')}}"></script>
</html>
