<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'admin'],
            ['password' => Hash::make('admin123')]
        );

        echo "Admin user created: admin / admin123\n";
        echo "⚠️  Change this password after first login!\n";
    }
}
