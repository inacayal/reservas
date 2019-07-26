<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function __construct(){

    }
    public function list() {
        $content = [
            'elem'=>'elemento'
        ];
        return response($content,200)
            ->header('Content-Type','application/json');
    }
}
