<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\TodoController;

// Laravel が自動で /api を付けるので api は不要

Route::get('/test', function () {
    return response()->json(['message' => 'Laravelから送信したAPIです3']);
});
Route::get('/test2', [ApiController::class, 'test']);

Route::get('/todos', [TodoController::class, 'index']);
Route::get('/todos/{id}', [TodoController::class, 'show']);
Route::post('/todos', [TodoController::class, 'store']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
