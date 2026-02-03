<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// auth
Route::post('/login', [AuthController::class, 'login']);

// posts
Route::get('/posts', [PostController::class, 'index']);

// tags
Route::get('/tags', [TagController::class, 'getTags']);

// categories
Route::get('/categories', [CategoryController::class, 'index']);
