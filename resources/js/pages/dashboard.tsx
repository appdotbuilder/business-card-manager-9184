import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-blue-100 text-lg">
                        Manage your digital business cards and company information
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    My Business Cards
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                            </div>
                            <div className="text-3xl">💼</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Views
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                            </div>
                            <div className="text-3xl">👁️</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Company Members
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                            </div>
                            <div className="text-3xl">👥</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Active Cards
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                            </div>
                            <div className="text-3xl">✅</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        🚀 Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link href={route('business-cards.create')}>
                            <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center">
                                <div className="text-2xl mb-1">➕</div>
                                <span>Create Business Card</span>
                            </Button>
                        </Link>

                        <Link href={route('business-cards.index')}>
                            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                <div className="text-2xl mb-1">📋</div>
                                <span>Manage Cards</span>
                            </Button>
                        </Link>

                        {user?.role === 'super_admin' && (
                            <Link href={route('companies.index')}>
                                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                    <div className="text-2xl mb-1">🏢</div>
                                    <span>Manage Companies</span>
                                </Button>
                            </Link>
                        )}

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
                            <div className="text-2xl mb-1">📊</div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">View Analytics</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">(Coming Soon)</span>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
                            <div className="text-2xl mb-1">🎨</div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">Custom Templates</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">(Coming Soon)</span>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
                            <div className="text-2xl mb-1">📤</div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">Export Cards</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">(Coming Soon)</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        📈 Recent Activity
                    </h2>
                    <div className="text-center py-8">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No activity yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Create your first business card to get started
                        </p>
                        <Link href={route('business-cards.create')} className="mt-4 inline-block">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Create Your First Card
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* User Role Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Your Role: <span className="capitalize">{user?.role ? (user.role as string).replace('_', ' ') : 'Unknown'}</span>
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {user?.role === 'super_admin' && 'Manage all companies and users'}
                                {user?.role === 'company_admin' && 'Manage your company and employees'}
                                {user?.role === 'manager' && 'Manage team members and business cards'}
                                {user?.role === 'employee' && 'Manage your personal business cards'}
                            </p>
                        </div>
                        <div className="text-2xl">
                            {user?.role === 'super_admin' && '👑'}
                            {user?.role === 'company_admin' && '🏢'}
                            {user?.role === 'manager' && '👨‍💼'}
                            {user?.role === 'employee' && '👤'}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}