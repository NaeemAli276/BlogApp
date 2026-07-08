<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentReplyResource;
use App\Models\Comment;
use App\Models\CommentReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CommentReplyController extends Controller
{
    
    public function index($id) {

        $comment = Comment::findOrFail($id);

        $replies = $comment->replies()
            ->with('user')
            ->get();

        return CommentReplyResource::collection($replies);

    }

    public function show($id) {
        $reply = CommentReply::with('user')
            ->findOrFail($id);

        // Log::info('comment: ',[
        //     $comment
        // ]); 

        return new CommentReplyResource($reply);
    }

    public function getRepliesId($id) {

        $comment = Comment::findOrFail($id);

        $repliesIds = $comment->replies()
            ->pluck('id')
            ->toArray();

        return response()->json($repliesIds);

    }

    public function store(Request $request) {   

        Log::info('comment received: ', [
            $request->all()
        ]);

        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'comment_id' => 'required|exists:comments,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $reply = new CommentReply();
        
        $reply->user_id = Auth::id();
        $reply->content = $validated['content'];
        $reply->comment_id = $validated['comment_id'];
        $reply->save();

        $reply->load('user');

        return response()->json(new CommentReplyResource($reply));

    }

    public function update(Request $request, $id)
    {
        
        Log::info('reply: ', [
            $request->all()
        ]);

        $reply = CommentReply::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'content' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $reply->content = $validated['content'];
        $reply->save();

        $reply->load('user');

        return response()->json(new CommentReplyResource($reply));

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        
        $reply = CommentReply::findOrFail($id);

        if (!$reply) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $reply->delete();
        return response()->json(['message' => 'Post deleted successfully']);
        

    }

}
