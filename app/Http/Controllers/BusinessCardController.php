<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBusinessCardRequest;
use App\Http\Requests\UpdateBusinessCardRequest;
use App\Models\BusinessCard;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessCardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = BusinessCard::with(['user', 'company'])
            ->when($request->user()?->company_id, function ($q) use ($request) {
                return $q->where('company_id', $request->user()->company_id);
            })
            ->latest();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $businessCards = $query->paginate(12);

        return Inertia::render('business-cards/index', [
            'businessCards' => $businessCards,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companies = Company::active()->get();
        $users = collect();

        if (auth()->user()->company_id) {
            $users = User::where('company_id', auth()->user()->company_id)
                ->active()
                ->get();
        }

        return Inertia::render('business-cards/create', [
            'companies' => $companies,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBusinessCardRequest $request)
    {
        $businessCard = BusinessCard::create($request->validated());

        return redirect()->route('business-cards.show', $businessCard)
            ->with('success', 'Business card created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BusinessCard $businessCard)
    {
        $businessCard->load(['user.company', 'user.department', 'user.designation']);
        
        // Increment views if not the owner
        if (!auth()->check() || auth()->id() !== $businessCard->user_id) {
            $businessCard->incrementViews();
        }

        return Inertia::render('business-cards/show', [
            'businessCard' => $businessCard,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BusinessCard $businessCard)
    {
        $businessCard->load(['user', 'company']);

        return Inertia::render('business-cards/edit', [
            'businessCard' => $businessCard,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBusinessCardRequest $request, BusinessCard $businessCard)
    {
        $businessCard->update($request->validated());

        return redirect()->route('business-cards.show', $businessCard)
            ->with('success', 'Business card updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BusinessCard $businessCard)
    {
        $businessCard->delete();

        return redirect()->route('business-cards.index')
            ->with('success', 'Business card deleted successfully.');
    }


}