<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::get('/', function () {
        return response()->json(['status' => 'ok']);
    });

    Route::get('/phpinfo', function () {
        return phpinfo();
    });
});
