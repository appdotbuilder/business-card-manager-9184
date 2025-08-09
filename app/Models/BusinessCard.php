<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

/**
 * App\Models\BusinessCard
 *
 * @property int $id
 * @property int $user_id
 * @property int $company_id
 * @property string $slug
 * @property string $template
 * @property array|null $colors
 * @property array|null $custom_fields
 * @property bool $is_default
 * @property bool $is_public
 * @property int $views_count
 * @property \Illuminate\Support\Carbon|null $last_viewed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Company $company
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard query()
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereTemplate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereColors($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereCustomFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereIsDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereIsPublic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereViewsCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereLastViewedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BusinessCard public()
 * @method static \Database\Factories\BusinessCardFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BusinessCard extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'company_id',
        'slug',
        'template',
        'colors',
        'custom_fields',
        'is_default',
        'is_public',
        'views_count',
        'last_viewed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'colors' => 'array',
        'custom_fields' => 'array',
        'is_default' => 'boolean',
        'is_public' => 'boolean',
        'views_count' => 'integer',
        'last_viewed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($businessCard) {
            if (empty($businessCard->slug)) {
                $businessCard->slug = Str::random(10);
            }
        });
    }

    /**
     * Get the user that owns the business card.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the company that owns the business card.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Scope a query to only include public business cards.
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * Increment the views count.
     */
    public function incrementViews()
    {
        $this->increment('views_count');
        $this->update(['last_viewed_at' => now()]);
    }
}