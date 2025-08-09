<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BusinessCard;
use Inertia\Inertia;

class PublicBusinessCardController extends Controller
{
    /**
     * Display a business card by slug (public view).
     */
    public function show(string $slug)
    {
        $businessCard = BusinessCard::where('slug', $slug)
            ->where('is_public', true)
            ->with(['user.company', 'user.department', 'user.designation'])
            ->firstOrFail();

        // Increment views
        $businessCard->incrementViews();

        return Inertia::render('business-cards/public', [
            'businessCard' => $businessCard,
        ]);
    }
}