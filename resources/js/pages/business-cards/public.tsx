import React from 'react';
import { Head } from '@inertiajs/react';
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
    views_count: number;
    user: {
        id: number;
        name: string;
        email: string;
        phone?: string;
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

export default function PublicBusinessCard({ businessCard }: Props) {
    const { user } = businessCard;
    const primaryColor = businessCard.colors?.primary || '#3B82F6';
    const secondaryColor = businessCard.colors?.secondary || '#1E40AF';

    const handleContact = (type: 'email' | 'phone', value: string) => {
        if (type === 'email') {
            window.location.href = `mailto:${value}`;
        } else if (type === 'phone') {
            window.location.href = `tel:${value}`;
        }
    };

    const saveContact = () => {
        // Generate vCard data
        const vCardData = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${user.name}`,
            `ORG:${user.company.name}`,
            user.designation ? `TITLE:${user.designation.title}` : '',
            `EMAIL:${user.email}`,
            user.phone ? `TEL:${user.phone}` : '',
            user.company.website ? `URL:${user.company.website}` : '',
            user.company.address ? `ADR:;;${user.company.address};;;` : '',
            user.bio ? `NOTE:${user.bio}` : '',
            'END:VCARD'
        ].filter(line => line).join('\n');

        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${user.name.replace(/\s+/g, '_')}.vcf`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <>
            <Head title={`${user.name} - ${user.company.name}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-2">💼</div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Digital Business Card
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            {user.company.name}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Business Card Display */}
                        <div className="flex justify-center">
                            <div className="w-full max-w-sm">
                                <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
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
                                            <h2 className="font-bold text-2xl">{user.name}</h2>
                                            {user.designation && (
                                                <p className="text-lg opacity-90">{user.designation.title}</p>
                                            )}
                                            {user.department && (
                                                <p className="text-sm opacity-75">{user.department.name}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Contact Information */}
                                    <div className="p-8 bg-white dark:bg-gray-50">
                                        <div className="space-y-4">
                                            <div 
                                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                                                onClick={() => handleContact('email', user.email)}
                                            >
                                                <span className="text-lg">📧</span>
                                                <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                                    {user.email}
                                                </span>
                                            </div>
                                            
                                            {user.phone && (
                                                <div 
                                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                                                    onClick={() => handleContact('phone', user.phone!)}
                                                >
                                                    <span className="text-lg">📱</span>
                                                    <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                                        {user.phone}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            {user.company.website && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg">🌐</span>
                                                    <a 
                                                        href={user.company.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                                    >
                                                        {user.company.website.replace(/^https?:\/\//, '')}
                                                    </a>
                                                </div>
                                            )}
                                            
                                            {user.company.address && (
                                                <div className="flex items-start gap-3">
                                                    <span className="text-lg">📍</span>
                                                    <span className="text-sm text-gray-600">
                                                        {user.company.address}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-6">
                            {/* Bio Section */}
                            {user.bio && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                                    <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                                        👤 About
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {user.bio}
                                    </p>
                                </div>
                            )}

                            {/* Social Links */}
                            {user.social_links && Object.keys(user.social_links).length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                                    <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                                        🔗 Connect
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {user.social_links.linkedin && (
                                            <a 
                                                href={user.social_links.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                💼 LinkedIn
                                            </a>
                                        )}
                                        {user.social_links.twitter && (
                                            <a 
                                                href={user.social_links.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                                            >
                                                🐦 Twitter
                                            </a>
                                        )}
                                        {user.social_links.website && (
                                            <a 
                                                href={user.social_links.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                            >
                                                🌐 Website
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                                <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                                    📲 Actions
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        onClick={saveContact}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        💾 Save to Contacts
                                    </Button>
                                    
                                    <Button
                                        onClick={() => handleContact('email', user.email)}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        📧 Send Email
                                    </Button>
                                    
                                    {user.phone && (
                                        <Button
                                            onClick={() => handleContact('phone', user.phone!)}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            📱 Call Now
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Company Info */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                                <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                                    🏢 Company
                                </h3>
                                <div className="space-y-2">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {user.company.name}
                                    </div>
                                    {user.company.website && (
                                        <div>
                                            <a 
                                                href={user.company.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                                            >
                                                Visit Website
                                            </a>
                                        </div>
                                    )}
                                    {user.company.phone && (
                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                            📞 {user.company.phone}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-12 text-sm text-gray-500">
                        <p>Powered by Business Card Manager</p>
                        <p className="mt-1">👁️ {businessCard.views_count} views</p>
                    </div>
                </div>
            </div>
        </>
    );
}