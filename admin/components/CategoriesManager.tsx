'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Category } from '@/lib/types';

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'categories'));
      setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Category)));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateDoc(doc(db, 'categories', editingId), formData);
      } else {
        await addDoc(collection(db, 'categories'), formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', slug: '', description: '' });
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return;
    try {
      await deleteDoc(doc(db, 'categories', id));
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Catégories</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-neutral-800"
        >
          {showForm ? 'Annuler' : 'Ajouter une catégorie'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded border border-neutral-200 mb-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
            />
            <input
              type="text"
              placeholder="Slug"
              value={formData.slug || ''}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
              rows={3}
            />
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
        {categories.map((category) => (
          <div key={category.id} className="flex justify-between items-center p-4 bg-white border border-neutral-200 rounded">
            <div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-neutral-600">{category.slug}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(category);
                  setEditingId(category.id);
                  setShowForm(true);
                }}
                className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(category.id)}
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
