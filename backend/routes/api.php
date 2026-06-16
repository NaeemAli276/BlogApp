<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/posts', [PostController::class, 'index'])->name('api.posts.index');
Route::get('/posts/featured', [PostController::class, 'getMostPopularPost'])->name('api.posts.getMostPopular');
Route::get('/posts/featured_posts', [PostController::class, 'getPopularPosts'])->name('api.posts.getPopularPosts');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('api.posts.show');
Route::get('/user/{user}/posts', [PostController::class, 'showUserPosts']);
Route::get('/posts/category/{category}', [PostController::class, 'getPostsByCategory'])->name('api.posts.category');    
Route::get('/user/posts_and_stats/{id}', [UserController::class,'getMyPosts'])->name('api.user.my_posts');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);