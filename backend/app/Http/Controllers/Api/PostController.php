<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Exception;
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
            'user_id' => 'required|exists:users,id'
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

        // $post = Post::create([
        //     'title' => $request->title,
        //     'excerpt' => $request->excerpt,
        //     'thumbnail' => $thumbnailPath,
        //     'mainContent' => $request->mainContent,
        //     'url' => $request->url,
        //     'is_published' => $request->is_published,
        //     'user_id' => $request->user()->id,
        //     'category_id' => $request->category_id,
        // ]);

        // Create the post with user_id
        $post = new Post();
        $post->user_id = Auth::id(); // or $request->user()->id
        $post->title = $validated['title'];
        $post->excerpt = $validated['excerpt'] ?? null;
        $post->thumbnail = $thumbnailPath ?? null;
        $post->mainContent = $validated['mainContent'];
        $post->url = $validated['url'] ?? null;
        $post->category_id = $validated['category_id'];
        $post->save();
        
        // Handle many-to-many tags (if present)
        if (isset($validated['tags'])) {
            $post->tags()->sync($validated['tags']);
        }

        $post->load('user', 'tags', 'category');

        if ($post->thumbnail) {
            $post->thumbnail = asset('storage/' . $post->thumbnail);
        }

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
    public function update(Request $request, $id)
    {

        $post = Post::findOrFail($id);

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
            'user_id' => 'required|exists:users,id'
        ]);

        try {

            if ($request->hasFile('thumbnail')) {
                
                if ($post->thumbnail) {
                    $this->deleteThumbnail($post->thumbnail);
                }

                // Upload new thumbnail
                $file = $request->file('thumbnail');
                $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
                $thumbnailPath = $file->storeAs('thumbnails', $filename, 'public');
                
                $post->thumbnail = $thumbnailPath;

                // Update other fields
                $post->fill($request->except(['thumbnail', 'tags']));
                $post->save();

                // Update tags if provided
                if ($request->has('tags')) {
                    $post->tags()->sync($request->tags);
                }

                $post->load(['user', 'tags', 'category']);
                $post->thumbnail_url = $post->thumbnail ? asset('storage/' . $post->thumbnail) : null;

                return response()->json([
                    'message' => 'Post updated successfully',
                    'post' => $post,
                ], 200);

            }

        }
        catch (Exception $e) {
            Log::error('Update error:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to update post',
                'error' => $e->getMessage()
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        if ($post->thumbnail) {
            $this->deleteThumbnail($post->thumbnail);
        }

        $post->delete();
        return response()->json(['message' => 'Post deleted successfully']);
        
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

    // useful functions

    protected function uploadThumbnail($file)
    {
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('thumbnails', $filename, 'public');
        return $path;
    }

    protected function deleteThumbnail($thumbnailPath)
    {
        try {
            // Check if it's a URL or stored path
            if (filter_var($thumbnailPath, FILTER_VALIDATE_URL)) {
                // It's a URL - you might want to handle external URLs differently
                // For external URLs, you usually don't delete them
                Log::info('External URL, skipping deletion', ['url' => $thumbnailPath]);
                return;
            }
            
            // Remove any leading slashes
            $path = ltrim($thumbnailPath, '/');
            
            // Check if it's a storage path
            if (str_starts_with($path, 'storage/')) {
                $path = str_replace('storage/', '', $path);
            }
            
            // Delete the file if it exists
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                Log::info('Thumbnail deleted:', ['path' => $path]);
            } else {
                Log::warning('Thumbnail not found:', ['path' => $path]);
            }
            
        } catch (\Exception $e) {
            Log::error('Failed to delete thumbnail:', [
                'path' => $thumbnailPath,
                'error' => $e->getMessage()
            ]);
        }
    }

}
