<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Todo;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Todo::insert([
            [ 'title' => '買い物に行く', 'body' => 'スーパーで食材を買う', 'completed' => false ],
            [ 'title' => 'Laravel学習', 'body' => 'Eloquentとマイグレーションを理解する', 'completed' => true ],
            [ 'title' => 'Next.jsでTodo作成', 'body' => 'SSR + CSR のハイブリッド構成を試す', 'completed' => false ],
        ]);
    }
}
