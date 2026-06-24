<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        // if (!$request->routeIs('api.posts.show')) {
        //     return [
        //         'id' => $this->id,
        //         'title' => $this->title,
        //         'excerpt' => $this->excerpt,
        //         'thumbnail' => $this->thumbnail,
        //         'date' => $this->created_at,
        //         'view_count' => $this->view_count,
        //         'url' => $this->url,

        //         'category' => new CategoryResource($this->whenLoaded('category')) ,

        //         'author' => new UserResource($this->whenLoaded('user')),
                
        //         'likes_count' => $this->whenCounted('likes'),
        //         'dislikes_count' => $this->whenCounted('dislikes'),

        //     ];
        // }
        
        // Full response for show route
        return [
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'thumbnail' => $this->thumbnail,
            'date' => $this->created_at,
            'view_count' => $this->view_count,
            'mainContent' => $this->mainContent,
            'url' => $this->url,

            'likes_count' => $this->whenCounted('likes'),
            'dislikes_count' => $this->whenCounted('dislikes'),
            
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),

            'author' => new UserResource($this->whenLoaded('user')),
            'category' => new CategoryResource($this->whenLoaded('category')) ,


        ];
    }
}
