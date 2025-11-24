'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import ProductsManager from '@/admin/components/ProductsManager';
import CategoriesManager from '@/admin/components/CategoriesManager';
import BannersManager from '@/admin/components/BannersManager';
import PagesManager from '@/admin/components/PagesManager';

type Tab = 'products' | 'categories' | 'banners' | 'pages';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.push('/admin/login');
        return;
      }

      // TODO: Check admin role
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-8 text-center">Chargement...</div>;
  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">BURBAN Admin</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm border border-neutral-300 rounded hover:bg-neutral-50"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-neutral-200">
          {(['products', 'categories', 'banners', 'pages'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 transition ${
                activeTab === tab
                  ? 'border-accent text-accent'
                  : 'border-transparent text-neutral-600 hover:text-accent'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'products' && <ProductsManager />}
          {activeTab === 'categories' && <CategoriesManager />}
          {activeTab === 'banners' && <BannersManager />}
          {activeTab === 'pages' && <PagesManager />}
        </div>
      </div>
    </div>
  );
}
