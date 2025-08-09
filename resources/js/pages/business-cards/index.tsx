import React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BusinessCard {
    id: number;
    slug: string;
    template: string;
    colors: {
        primary?: string;
        secondary?: string;
        accent?: string;
    } | null;
    is_default: boolean;
    is_public: boolean;
    views_count: number;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
        phone?: string;
        avatar?: string;
    };
    company: {
        id: number;
        name: string;
        logo?: string;
    };
}

interface Props {
    businessCards: {
        data: BusinessCard[];
        links: { url?: string; active: boolean; label: string }[];
        meta: { current_page: number; total: number };
    };
    filters: {
        search?: string;
    };
    [key: string]: unknown;
}

export default function Index({ businessCards, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('business-cards.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (businessCard: BusinessCard) => {
        if (confirm('Are you sure you want to delete this business card?')) {
            router.delete(route('business-cards.destroy', businessCard.id));
        }
    };

    return (
        <AppShell>
            <Head title="Business Cards" />
            
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            💼 Business Cards
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage digital business cards for your organization
                        </p>
                    </div>
                    
                    <Link href={route('business-cards.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Create Business Card
                        </Button>
                    </Link>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex gap-4">
                    <Input
                        type="text"
                        placeholder="Search business cards..."
                        value={data.search}
                        onChange={e => setData('search', e.target.value)}
                        className="max-w-md"
                    />
                    <Button type="submit" disabled={processing}>
                        🔍 Search
                    </Button>
                </form>

                {/* Business Cards Grid */}
                {businessCards.data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No business cards found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Get started by creating your first business card
                        </p>
                        <Link href={route('business-cards.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Create Business Card
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {businessCards.data.map((card) => (
                            <div
                                key={card.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                {/* Card Preview */}
                                <div 
                                    className="h-32 p-4 text-white relative"
                                    style={{
                                        background: card.colors?.primary 
                                            ? `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.secondary || card.colors.primary})`
                                            : 'linear-gradient(135deg, #3B82F6, #1E40AF)'
                                    }}
                                >
                                    <div className="text-right text-xs opacity-75 mb-2">
                                        {card.company.name.toUpperCase()}
                                    </div>
                                    <h3 className="font-bold text-lg">{card.user.name}</h3>
                                    <p className="text-sm opacity-90">{card.user.email}</p>
                                </div>

                                {/* Card Info */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            {card.is_default && (
                                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                                                    Default
                                                </span>
                                            )}
                                            {card.is_public && (
                                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                                    Public
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            👁️ {card.views_count} views
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link href={route('business-cards.show', card.id)}>
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={route('business-cards.edit', card.id)}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(card)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {businessCards.data.length > 0 && (
                    <div className="flex justify-center">
                        {/* Simple pagination */}
                        <div className="flex gap-2">
                            {businessCards.links.map((link: { url?: string; active: boolean; label: string }, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 text-sm rounded ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}