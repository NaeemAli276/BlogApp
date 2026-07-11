<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function getMyPosts($userId)
    {
        // Get ALL posts for this user
        $posts = Post::with(['user', 'comments.user', 'tags', 'category'])
            ->withCount(['likes', 'dislikes'])
            ->where('user_id', $userId) // ← Filter by user
            ->get(); // ← Get collection
        
        // // Now sum() works on the collection
        // $total_view_count = $posts->sum('view_count');
        // $total_like_count = $posts->sum('likes_count');
        // $total_dislike_count = $posts->sum('dislikes_count');
        // $total_share_count = $posts->sum('share_count');
        
        return PostResource::collection($posts);
            // 'stats' => [
            //     'total_view_count' => $total_view_count,
            //     'total_like_count' => $total_like_count,
            //     'total_dislike_count' => $total_dislike_count,
            //     'total_share_count' => $total_share_count,
            // ],
             // ← Use collection, not single resource
    }

    public function getMyStats($id) {
        $posts = Post::withCount(['likes', 'dislikes'])
            ->where('user_id', $id)
            ->get();


        // Log::info('posts: ',[
        //     $posts,
        // ]);
        // dd($posts->count(), $posts->toArray()); // Debug to see what's returned

        // If view_count is a column in posts table
        $total_view_count = $posts->sum('view_count');

        // These should work if withCount is used correctly
        $total_like_count = $posts->sum('likes_count');
        $total_dislike_count = $posts->sum('dislikes_count');

        // Alternative if you want to count all likes across all posts
        // $total_like_count = \App\Models\Like::whereIn('post_id', $posts->pluck('id'))->count();

        return [
            'total_view_count' => $total_view_count,
            'total_like_count' => $total_like_count,
            'total_dislike_count' => $total_dislike_count,
        ];
    }

}
