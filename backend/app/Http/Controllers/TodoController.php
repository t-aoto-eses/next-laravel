<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // 一覧取得
    public function index()
    {
        $todo = Todo::all();
        return response()->json($todo);
    }

    // 単一取得
    public function show($id)
    {
        $todo = Todo::findOrFail($id);
        return response()->json($todo);
    }

    // 作成
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'nullable|string',
            'completed' => 'boolean'
        ]);

        $todo = Todo::create([
            'title' => $request->title,
            'body' => $request->body ?? null,
            'completed' => $request->completed ?? false,
        ]);

        return response()->json($todo, 201);
    }

    // 更新
    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'body' => 'nullable|string',
            'completed' => 'boolean'
        ]);

        $todo->update($request->only(['title', 'body', 'completed']));

        return response()->json($todo);
    }

    // 削除
    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(['message' => 'Deleted']);
    }

}
