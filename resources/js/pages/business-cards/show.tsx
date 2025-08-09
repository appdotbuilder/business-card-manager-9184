import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface BusinessCard {
    id: number;
    slug: string;
    template: string;
    colors: {
        primary?: string;
        secondary?: string;
        accent?: string;
    } | null;
    custom_fields: Record<string, unknown>[] | null;
    is_default: boolean;
    is_public: boolean;
    views_count: number;
    last_viewed_at?: string;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
        phone?: string;
        avatar?: string;
        bio?: string;
        social_links?: {
            linkedin?: string;
            twitter?: string;
            website?: string;
        } | null;
        company: {
            id: number;
            name: string;
            logo?: string;
            website?: string;
            phone?: string;
            address?: string;
        };
        department?: {
            id: number;
            name: string;
        } | null;
        designation?: {
            id: number;
            title: string;
        } | null;
    };
}

interface Props {
    businessCard: BusinessCard;
    [key: string]: unknown;
}

export default function Show({ businessCard }: Props) {
    const { user } = businessCard;
    const primaryColor = businessCard.colors?.primary || '#3B82F6';
    const secondaryColor = businessCard.colors?.secondary || '#1E40AF';

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    const publicUrl = `${window.location.origin}/cards/${businessCard.slug}`;

    return (
        <AppShell>
            <Head title={`${user.name} - Business Card`} />
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            💼 Business Card
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            {user.name} - {user.company.name}
                        </p>
                    </div>
                    
                    <div className="flex gap-2">
                        <Link href={route('business-cards.edit', businessCard.id)}>
                            <Button variant="outline">
                                ✏️ Edit
                            </Button>
                        </Link>
                        <Link href={route('business-cards.index')}>
                            <Button variant="outline">
                                ← Back to List
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Business Card Preview */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Card Preview</h2>
                        
                        {/* Large Card Display */}
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md mx-auto">
                            {/* Card Front */}
                            <div 
                                className="p-8 text-white relative"
                                style={{
                                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                                }}
                            >
                                <div className="text-right text-xs opacity-75 mb-4">
                                    {user.company.name.toUpperCase()}
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-2xl">{user.name}</h3>
                                    {user.designation && (
                                        <p className="text-lg opacity-90">{user.designation.title}</p>
                                    )}
                                    {user.department && (
                                        <p className="text-sm opacity-75">{user.department.name}</p>
                                    )}
                                </div>
                            </div>
                            
                            {/* Card Back - Contact Info */}
                            <div className="p-8 bg-gray-50 dark:bg-gray-800">
                                <div className="space-y-4">
                                    <div className="grid gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">📧</span>
                                            <span className="text-sm">{user.email}</span>
                                        </div>
                                        
                                        {user.phone && (
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">📱</span>
                                                <span className="text-sm">{user.phone}</span>
                                            </div>
                                        )}
                                        
                                        {user.company.website && (
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">🌐</span>
                                                <span className="text-sm">{user.company.website}</span>
                                            </div>
                                        )}
                                        
                                        {user.company.address && (
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">📍</span>
                                                <span className="text-sm">{user.company.address}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Social Links */}
                                    {user.social_links && Object.keys(user.social_links).length > 0 && (
                                        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                                            <div className="flex gap-3">
                                                {user.social_links.linkedin && (
                                                    <a 
                                                        href={user.social_links.linkedin} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        💼 LinkedIn
                                                    </a>
                                                )}
                                                {user.social_links.twitter && (
                                                    <a 
                                                        href={user.social_links.twitter} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-500"
                                                    >
                                                        🐦 Twitter
                                                    </a>
                                                )}
                                                {user.social_links.website && (
                                                    <a 
                                                        href={user.social_links.website} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 hover:text-gray-700"
                                                    >
                                                        🌐 Website
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Details & Actions */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Card Details</h2>
                        
                        {/* Statistics */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                            <h3 className="font-semibold mb-4">📊 Statistics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{businessCard.views_count}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium">
                                        {businessCard.last_viewed_at 
                                            ? new Date(businessCard.last_viewed_at).toLocaleDateString()
                                            : 'Never'
                                        }
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Last Viewed</div>
                                </div>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                            <h3 className="font-semibold mb-4">⚙️ Settings</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Default Card</span>
                                    <span className={`px-2 py-1 rounded text-xs ${businessCard.is_default ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {businessCard.is_default ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Public Access</span>
                                    <span className={`px-2 py-1 rounded text-xs ${businessCard.is_public ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {businessCard.is_public ? 'Public' : 'Private'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Template</span>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs capitalize">
                                        {businessCard.template}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Share Card */}
                        {businessCard.is_public && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                                <h3 className="font-semibold mb-4">🔗 Share Card</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Public URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={publicUrl}
                                                readOnly
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                                            />
                                            <Button
                                                onClick={() => copyToClipboard(publicUrl)}
                                                size="sm"
                                            >
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <a
                                            href={publicUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button variant="outline" size="sm">
                                                🔍 Preview Public View
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}