<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use function Illuminate\Support\now;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember_me' => 'boolean'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if ($request->remember_me == true) {
            return response()->json([
                'user' => new UserResource($user),
                'token' => $user->createToken('auth_token')->plainTextToken
            ]);
        }
        else {
            return response()->json([
                'user' => $user,
                // 'token' => $user->createToken('auth_token')->plainTextToken
            ]);
        }   
    }

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'remember_me' => 'boolean'
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(10),
            'email_verified_at' => now()
        ]);

        if ($request->remember_me == true) {
            return response()->json([
                'user' => new UserResource($user),
                'token' => $user->createToken('auth_token')->plainTextToken
            ], 201);
        }
        else {
            return response()->json([
                'user' => $user,
            ], 201);
        }

        
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(Request $request, $id) {

        $user = User::findOrFail($id);

        Log::info('user data: ', [
            $request,
            $request->all(),
            $user
        ]);
        
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'profileImg' => [
                'sometimes',
                function ($attribute, $value, $fail) use ($user) {
                    // Skip validation if profileImg hasn't changed
                    if ($value === $user->profileImg) {
                        return;
                    }
                    
                    // Check if it's a URL
                    if (filter_var($value, FILTER_VALIDATE_URL)) {
                        // It's a URL, skip image validation
                        return;
                    }
                    
                    // Only validate as image if it's a file upload
                    if (request()->hasFile('profileImg')) {
                        $validator = validator(
                            ['profileImg' => request()->file('profileImg')],
                            ['profileImg' => 'image|mimes:jpeg,png,jpg,gif|max:2048']
                        );
                        
                        if ($validator->fails()) {
                            $fail('The profileImg must be an image file.');
                        }
                    }
                },
            ],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Handle profileImg upload (old one will be auto-deleted by model event)
            if ($request->hasFile('profileImg')) {
                $file = $request->file('profileImg');
                $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
                $profileImgPath = $file->storeAs('profileImgs', $filename, 'public');
                
                // Set the new profileImg - the updating event will handle deletion
                $user->profileImg = $profileImgPath;
            }

            // Update other fields
            $user->fill($request->except(['profileImg']));
            $user->save(); // This triggers the updating event

            if ($user->profileImg) {
                $user->profileImg = asset('storage/' . $user->profileImg);
            }

            

            return response()->json([
                'message' => 'Post updated successfully',
                'post' => new UserResource($user),
            ], 200);
        }
        catch (Exception $e) {
            Log::error('Update error:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to update post',
                'error' => $e->getMessage()
            ], 500);
        }


    }

}
