<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::get('/phpinfo', function () {
        return phpinfo();
    });

    Route::get('/test', function () {
        return response()->json(['message' => 'Laravelから送信したAPIです']);
    });

    Route::get('/test2', [ApiController::class, 'test']);

    Route::get('/todos', [TodoController::class, 'index']);
    Route::get('/todos/{id}', [TodoController::class, 'show']);
    Route::post('/todos', [TodoController::class, 'store']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
});
