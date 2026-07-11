<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $profileImg = $this->profileImg;

        if (!filter_var($profileImg, FILTER_VALIDATE_URL)) {
            // String is not a valid URL
            $profileImg = asset('storage/'. $this->profileImg);
        }

        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'profileImg' => $profileImg  // ← Changed from $this->$profileImg
        ];

    }
}
