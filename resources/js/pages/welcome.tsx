import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="w-full max-w-6xl">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <div className="mb-6">
                                <span className="text-6xl mb-4 block">💼</span>
                                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Business Card Manager
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                    Create, manage, and share professional digital business cards for your entire organization. 
                                    Multi-tenant platform with role-based access control.
                                </p>
                            </div>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        🚀 Start Free Trial
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-3xl mb-4">🏢</div>
                                <h3 className="font-semibold text-lg mb-2">Multi-Tenant</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Separate companies with isolated data and user management
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-3xl mb-4">👥</div>
                                <h3 className="font-semibold text-lg mb-2">Role Management</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Super Admin, Company Admin, Manager, and Employee roles
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-3xl mb-4">🎨</div>
                                <h3 className="font-semibold text-lg mb-2">Custom Templates</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Multiple card templates with customizable colors and fields
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-3xl mb-4">📊</div>
                                <h3 className="font-semibold text-lg mb-2">Analytics</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Track card views and engagement metrics
                                </p>
                            </div>
                        </div>

                        {/* Demo Cards */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
                            <h2 className="text-2xl font-bold text-center mb-8">Sample Business Cards</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Card Template 1 */}
                                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg">
                                    <div className="text-right text-xs opacity-75 mb-2">ACME CORP</div>
                                    <h3 className="font-bold text-lg">John Smith</h3>
                                    <p className="text-sm opacity-90">Senior Developer</p>
                                    <div className="mt-4 space-y-1 text-xs">
                                        <div>📧 john@acme.com</div>
                                        <div>📱 (555) 123-4567</div>
                                    </div>
                                </div>

                                {/* Card Template 2 */}
                                <div className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-lg">
                                    <div className="text-gray-500 text-xs mb-2">TECH SOLUTIONS</div>
                                    <h3 className="font-bold text-lg text-gray-800">Sarah Johnson</h3>
                                    <p className="text-sm text-gray-600">Project Manager</p>
                                    <div className="mt-4 space-y-1 text-xs text-gray-600">
                                        <div>📧 sarah@techsolutions.com</div>
                                        <div>📱 (555) 987-6543</div>
                                    </div>
                                </div>

                                {/* Card Template 3 */}
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-lg">
                                    <div className="text-right text-xs opacity-75 mb-2">CREATIVE AGENCY</div>
                                    <h3 className="font-bold text-lg">Mike Davis</h3>
                                    <p className="text-sm opacity-90">Creative Director</p>
                                    <div className="mt-4 space-y-1 text-xs">
                                        <div>📧 mike@creative.com</div>
                                        <div>📱 (555) 456-7890</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-2xl shadow-xl">
                                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                                    Join hundreds of companies already using our platform to manage their digital business cards.
                                </p>
                                <Link
                                    href={route('register')}
                                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all hover:shadow-xl inline-block"
                                >
                                    🎯 Create Your Account
                                </Link>
                            </div>
                        )}
                    </main>
                </div>
                
                <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                    Built with ❤️ using Laravel & React
                </footer>
            </div>
        </>
    );
}