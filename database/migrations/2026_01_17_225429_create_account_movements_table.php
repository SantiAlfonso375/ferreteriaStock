<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create("account_movements", function (Blueprint $table) {
            $table->id();
            $table->foreignId("client_id")->constrained()->onDelete("cascade");
            $table->string("description");
            $table->float("amount", 12, 2)->default(0);
            $table->enum("type", ["debt", "payment"]);
            $table->json("items")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("account_movements");
    }
};
