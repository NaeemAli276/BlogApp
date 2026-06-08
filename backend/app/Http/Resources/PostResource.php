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
        // Only show these fields on api.posts.show
        if (!$request->routeIs('api.posts.show')) {
            return [
                'id' => $this->id,
                'title' => $this->title,
                'excerpt' => $this->excerpt,
                'thumbnail' => $this->thumbnail,
                'date' => $this->created_at->format('d/m/Y'),
                'author' => new UserResource($this->whenLoaded('user')),
                'category' => $this->whenLoaded('category', function() {
                    return $this->category->category_name;
                }),
                'view_count' => $this->view_count,
                'url' => $this->url
            ];
        }
        
        // Full response for show route
        return [
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'thumbnail' => $this->thumbnail,
            'date' => $this->created_at->format('d/m/Y'),
            'author' => new UserResource($this->whenLoaded('user')),
            'category' => $this->whenLoaded('category', function() {
                return $this->category->category_name;
            }),
            'mainContent' => $this->mainContent,
            'tags' => $this->whenLoaded('tags', function() {
                return $this->tags->pluck('tag_name')->toArray();
            }, []), // Return empty array if not loaded
            // 'tags' => TagResource::collection($this->whenLoaded('tags')),
            'likes_count' => $this->whenCounted('likes'),
            'dislikes_count' => $this->whenCounted('dislikes'),       
            'url' => $this->url,
            'view_count' => $this->view_count
        ];
    }
}
