<?php

// backend\routes\api.php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\TodoController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

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

// CSRF Cookie取得（Next.jsから最初に叩く）
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['status' => 'csrf-cookie set']);
});

// ログイン
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    Auth::login($user);
    return response()->json(['status' => 'logged in']);
});

// ログアウト
Route::post('/logout', function () {
    Auth::logout();
    return response()->json(['status' => 'logged out']);
});

// ユーザー情報取得（ログイン後）
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 会員登録
Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    Auth::login($user);

    return response()->json(['status' => 'registered']);
});
