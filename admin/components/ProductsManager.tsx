'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Product } from '@/lib/types';

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    description: '',
    sku: '',
    price: 0,
    images: [],
    colors: [],
    sizes: [],
    category: '',
    tags: [],
    featured: false,
    stock: 0,
    seo: { title: '', description: '', ogImage: '' },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product)));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), formData);
      } else {
        await addDoc(collection(db, 'products'), {
          ...formData,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        sku: '',
        price: 0,
        images: [],
        colors: [],
        sizes: [],
        category: '',
        tags: [],
        featured: false,
        stock: 0,
        seo: { title: '', description: '', ogImage: '' },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Produits</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-neutral-800"
        >
          {showForm ? 'Annuler' : 'Ajouter un produit'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded border border-neutral-200 mb-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Titre"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
              rows={4}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="SKU"
                value={formData.sku || ''}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="px-3 py-2 border border-neutral-300 rounded"
              />
              <input
                type="number"
                placeholder="Prix"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="px-3 py-2 border border-neutral-300 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Catégorie"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-3 py-2 border border-neutral-300 rounded"
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock || 0}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="px-3 py-2 border border-neutral-300 rounded"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <span>En vedette</span>
            </label>
            <button
              onClick={handleSave}
              className="w-full py-2 bg-accent text-white rounded hover:bg-neutral-800"
            >
              {editingId ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between items-center p-4 bg-white border border-neutral-200 rounded">
            <div>
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-sm text-neutral-600">{product.sku} • {product.price}€</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
