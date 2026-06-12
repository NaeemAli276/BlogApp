<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of posts.
     */
    public function index()
    {
        
        // get multiple posts
        $posts = Post::with('user', 'category')
            ->latest()
            ->limit(6)
            ->get();

        // $posts = Post::all();

        return PostResource::collection($posts);

    }

    // display user posts
    public function showUserPosts(User $user) {

        $posts = $user->posts()
            ->with(['user', 'category'])
            ->latest()
            ->get();

        return PostResource::collection($posts);

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
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::with('user', 'comments.user', 'tags', 'category')
                ->withCount(['likes', 'dislikes'])
                ->findOrFail($id)
                ->recordView();

        return new PostResource($post);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }

    // gets the most popular post
    public function getMostPopularPost() {
        $post = Post::with('user', 'category')
        // ->withCount('likes', 'dislikes')
        ->orderBy('view_count', 'desc')
        ->latest()
        ->first();

        return new PostResource($post);
    }

    public function getPopularPosts() {

        $post = Post::with('user', 'category')
        ->orderBy('view_count', 'desc')
        ->skip(1)
        ->take(5)
        ->get();
        
        return PostResource::collection($post);

    }

    public function getPostsByCategory($category)
    {
        $posts = Post::with('user', 'category', 'tags')
            ->whereHas('category', function($query) use ($category) {
                $query->where('category_name', $category);
            })
            ->latest()
            ->get();
            // ->paginate(15);
    
        return PostResource::collection($posts);
    }

}
