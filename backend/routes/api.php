<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\CommentReplyController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TagController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);


// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        $user = $request->user();

        return new UserResource($user);

    });
});

// API Resources - Tags
Route::prefix('tags')->group(function () {
    Route::get('/', [TagController::class, 'index'])->name('api.tags.index');
    Route::get('/search', [TagController::class, 'searchTag'])->name('api.tags.search');
});

// API Resources - Categories
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index'])->name('api.categories.index');
    Route::get('/{category}/posts', [PostController::class, 'getPostsByCategory'])->name('api.categories.posts');
});

// API Resources - Posts
Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index'])->name('api.posts.index');
    Route::get('/featured', [PostController::class, 'getMostPopularPost'])->name('api.posts.featured');
    Route::get('/popular', [PostController::class, 'getPopularPosts'])->name('api.posts.popular');
    Route::get('/{id}', [PostController::class, 'show'])->name('api.posts.show');
    Route::get('/{id}/comments', [CommentController::class, 'index']);
});

// API Resources - Comments
Route::prefix('comments')->group(function() {
    Route::get('/reply/{id}', [CommentReplyController::class, 'show']);
    Route::get('/comment/{id}', [CommentController::class, 'show']);
    Route::get('/{id}/replies', [CommentReplyController::class, 'index']);
    Route::get('/{id}/commentIds', [CommentController::class, 'getCommentsForPostIds']);
    Route::get('/{id}/repliesIds', [CommentReplyController::class, 'getRepliesId']);
});


// API Resources - Users
Route::prefix('users')->group(function () {
    Route::get('/{user}/posts', [PostController::class, 'showUserPosts'])->name('api.users.posts');
    Route::get('/{id}/posts-and-stats', [UserController::class, 'getMyPosts'])->name('api.users.posts');
    Route::get('/{id}/stats', [UserController::class, 'getMyStats'])->name('api.users.stats');
});

Route::middleware('auth:sanctum')->group(function() {

    // posts
    Route::prefix('posts-crud')->group(function() {
        Route::post('/create', [PostController::class, 'store']);
        Route::delete('/delete/{id}', [PostController::class, 'destroy']);
        Route::put('/update/{id}', [PostController::class, 'update']);
    });

    // comments
    Route::prefix('comments-crud')->group(function() {
        Route::post('/create', [CommentController::class, 'store']);
        Route::put('/update/{id}', [CommentController::class, 'update']);
        Route::delete('/delete/{id}', [CommentController::class, 'destroy']);
    });

    // reply
    Route::prefix('reply-crud')->group(function() {
        Route::post('/create', [CommentReplyController::class, 'store']);
        Route::put('/update/{id}', [CommentReplyController::class, 'update']);
        Route::delete('/delete/{id}', [CommentReplyController::class, 'destroy']);
    });

    // user
    Route::prefix('user-crud')->group(function() {
        Route::put('update/{id}', [AuthController::class, 'update']);
    });

});