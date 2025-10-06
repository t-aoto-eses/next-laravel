<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function test()
    {
        $json = response()->json(['message' => 'コントローラーから返したレスポンスです']);
        return $json;
    }
}
