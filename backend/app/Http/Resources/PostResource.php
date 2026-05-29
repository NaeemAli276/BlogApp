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
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'thumbnail' => $this->thumbnail,
            'date' => $this->created_at->toISOString(),
            'author' => new UserResource($this->whenLoaded('User')),
            'category' => new CategoryResource($this->whenLoaded('Category')),

            // conditional
            'mainContent' => $this->when($request->routeIs('posts.show'), $this->mainContent),
            'tags' => $this->when($request->routeIs('posts.show') ,TagResource::collection($this->whenLoaded('Tags'))),
            'likes' 

        ];

    }
}
