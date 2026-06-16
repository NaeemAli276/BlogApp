<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Post;

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
        
        // Now sum() works on the collection
        $total_view_count = $posts->sum('view_count');
        $total_like_count = $posts->sum('likes_count');
        $total_dislike_count = $posts->sum('dislikes_count');
        $total_share_count = $posts->sum('share_count');
        
        return [
            'stats' => [
                'total_view_count' => $total_view_count,
                'total_like_count' => $total_like_count,
                'total_dislike_count' => $total_dislike_count,
                'total_share_count' => $total_share_count,
            ],
            'posts' => PostResource::collection($posts) // ← Use collection, not single resource
        ];
    }
}
