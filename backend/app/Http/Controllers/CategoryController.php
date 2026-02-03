<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //

    public function index() {

        $categories = Category::all();

        return response()->json([
            'success' => true,
            'categories' => $categories
        ]);

    }

    public function store(Request $request) {

        $validated = $request->validate([
            'name' => 'required|string|max:16'
        ]);

        Category::create($validated);

        return response()->json([
            'success' => true
        ]);

    } 

    public function update(Request $request, String $id) {

        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:16'
        ]);

        $category->update($validated);

        return response()->json([
            'success' => true
        ]);

    }

    public function delete(string $id) {

        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'success' => true
        ]);

    }

}
