<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Tag $tag)
    {
        //
        $tags = $tag::all();

        return response()->json([
            'tags' => $tags->pluck('tag_name')
        ]);
    }

    public function searchTag(Request $request)
    {
        $searchTerm = $request->input('search', ''); // Default to empty string
        
        $query = Tag::query();
        
        if (!empty($searchTerm)) {
            $query->where('tag_name', 'like', '%' . $searchTerm . '%');
        }
        
        $tags = $query->latest()->get();
        
        return response()->json([
            'tags' => $tags,
            // 'meta' => [
            //     'total' => $tags->total(),
            //     'search_term' => $searchTerm ?: 'Latest tags'
            // ]
        ]);
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
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        //
    }
}
