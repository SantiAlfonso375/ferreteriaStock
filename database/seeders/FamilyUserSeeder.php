<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FamilyUserSeeder extends Seeder
{
    public function run(): void
    {
        $passwordDefault = Hash::make("123456");

        $members = [
            [
                "name" => "Claudio (Papá)",
                "email" => "Claudio@ferreteria.com",
                "role" => "admin",
            ],
            [
                "name" => "Santiago",
                "email" => "santiago@ferreteria.com",
                "role" => "admin",
            ],
            [
                "name" => "Silvia (Mamá)",
                "email" => "silvia@ferreteria.com",
                "role" => "admin",
            ],
            [
                "name" => "Gonzalo",
                "email" => "gonzalo@ferreteria.com",
                "role" => "employee",
            ],
            [
                "name" => "Pablo",
                "email" => "pablo@ferreteria.com",
                "role" => "employee",
            ],
        ];

        foreach ($members as $member) {
            User::updateOrCreate([
                "name" => $member["name"],
                "password" => $passwordDefault,
                "role" => $member["role"],
            ]);
        }
    }
}
