<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

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

        Log::info('request received', [
            $request->all()
        ]);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'excerpt' => 'required|string',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,bmp|max:2048',
            'url' => 'required|string',
            'tags' => 'sometimes|array',
            'tags.*' => 'exists:tags,id', // Each tag must exist,
            'is_published' => 'required|boolean',
            'mainContent' => 'required|string',
            'category_id' => 'required|exists:categories,id', 
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $this->uploadThumbnail($request->file('thumbnail'));
            Log::info('Thumbnail uploaded', ['path' => $thumbnailPath]);
        }

        $post = Post::create([
            'title' => $request->title,
            'excerpt' => $request->excerpt,
            'thumbnail' => $thumbnailPath,
            'mainContent' => $request->mainContent,
            'url' => $request->url,
            'is_published' => $request->is_published,
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
        ]);
        
        // Handle many-to-many tags (if present)
        if (isset($validated['tags'])) {
            $post->tags()->sync($validated['tags']);
        }

        $post->load('user', 'tags', 'category');

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post,
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::with(['user', 'comments.user', 'tags', 'category'])
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

    protected function uploadThumbnail($file)
    {
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('thumbnails', $filename, 'public');
        return $path;
    }

}
