<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);   
        
        // if ($request->routeIs('api.comments.getIds')) {
        //     return [
        //         'id' => $this->pluck('id'),
        //     ];
        // }

        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'comment_id' => $this->post_id,
            'content' => $this->content,
        ];

    }
}
