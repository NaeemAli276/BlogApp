<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $post = Post::findOrFail($id);

        $comments = $post->comments()
                    ->with('user', 'replies.user')
                    ->get();

        return CommentResource::collection($comments);
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
        
        Log::info('comment received: ', [
            $request->all()
        ]);

        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'post_id' => 'required|exists:posts,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $comment = new Comment();
        
        $comment->user_id = Auth::id();
        $comment->content = $validated['content'];
        $comment->post_id = $validated['post_id'];
        $comment->save();

        $comment->load('user');

        return response()->json(new CommentResource($comment));

    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        
        $comment = Comment::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'content' => 'required|string'
        ]);

        Log::info('comment: ', [
            $request->all()
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $comment->content = $validated['content'];
        $comment->save();

        $comment->load('user');

        return response()->json(new CommentResource($comment));

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        
        $comment = Comment::findOrFail($id);

        if (!$comment) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $comment->delete();
        return response()->json(['message' => 'Post deleted successfully']);
        

    }

    public function getRepliesForComment($id) {

        $comment = Comment::findOrFail($id);

    }

}
