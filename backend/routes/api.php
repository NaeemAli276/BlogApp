<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// auth
Route::post('/login', [AuthController::class, 'login']);

// posts
Route::get('/posts', [PostController::class, 'index']);