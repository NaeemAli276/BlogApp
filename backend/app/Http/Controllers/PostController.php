<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    
    public function show(Request $request) {

        $post = Post::findOrFail($request);

        return response()->json([
            'success' => true,
            'data' => $post
        ]);

    }

    public function index(Request $request) {

        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);

        $posts = Post::with('category')->latest()->paginate($perPage, ['*'], $page);

        return response()->json([
            'success' => true,
            'data' => $posts->items(),
            'pagination' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
                'next_page_url' => $posts->nextPageUrl(),
                'has_more' => $posts->hasMorePages(),
            ]
        ]);

    }

    public function store(Request $request) {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
            'type' => 'required',
            'json_blocks' => 'array',
            
        ]);

        $post = Post::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'category_id' => $validated['category_id'],
            'user_id' => auth()->id()
        ]);

        if (!isset($validated['tags'])) {
            $post->tag()->attach($validated['tags']);
        } 

        return response()->json([
            'success' => true,
            'data' => $post->load(['tags', 'category'])
        ]);

    }

    // public function update(Request $request, String $id) {

    //     $validated = $request->validate([
    //         'title' => 'sometimes|string|max:255',
    //         'slug' => 'sometimes|string|max:255',
    //         'category_id' => 'sometimes|exists:categories,id',
    //         'tags' => 'array',
    //         'tags.*' => 'exists:tags,id',
    //     ]);



    // }

}
