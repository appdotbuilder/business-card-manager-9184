<?php

use App\Http\Controllers\BusinessCardController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\PublicBusinessCardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public business card view
Route::get('/cards/{slug}', [PublicBusinessCardController::class, 'show'])->name('business-cards.public');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Business Cards Management
    Route::resource('business-cards', BusinessCardController::class);
    
    // Companies Management (Super Admin only)
    Route::resource('companies', CompanyController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
