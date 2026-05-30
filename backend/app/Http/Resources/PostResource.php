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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'thumbnail' => $this->thumbnail,
            'date' => $this->created_at->format('d/m/Y'),
            
            // Use lowercase to match how you loaded them
            'author' => new UserResource($this->whenLoaded('user')),
            'category' => $this->whenLoaded('category', function() {
                return $this->category->category;
            }),

            // conditional
            'mainContent' => $this->when($request->routeIs('posts.show'), $this->mainContent),
            'tags' => $this->when(
                $request->routeIs('posts.show'), 
                TagResource::collection($this->whenLoaded('tags'))
            ),
            'likes' => $this->when(
                $request->routeIs('posts.show'), 
                $this->whenCounted('likes')  
            ),
            'dislikes' => $this->when(
                $request->routeIs('posts.show'), 
                $this->whenCounted('dislikes')
            ),
        ];
    }
}
