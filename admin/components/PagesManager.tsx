'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  type: 'about' | 'contact' | 'size-guide' | 'faq';
}

export default function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Page>>({
    slug: '',
    title: '',
    content: '',
    type: 'about',
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'pages'));
      setPages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Page)));
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateDoc(doc(db, 'pages', editingId), formData);
      } else {
        await addDoc(collection(db, 'pages'), formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ slug: '', title: '', content: '', type: 'about' });
      fetchPages();
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return;
    try {
      await deleteDoc(doc(db, 'pages', id));
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Pages</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-neutral-800"
        >
          {showForm ? 'Annuler' : 'Ajouter une page'}
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
            <input
              type="text"
              placeholder="Slug"
              value={formData.slug || ''}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
            />
            <select
              value={formData.type || 'about'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Page['type'] })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
            >
              <option value="about">À propos</option>
              <option value="contact">Contact</option>
              <option value="size-guide">Guide des tailles</option>
              <option value="faq">FAQ</option>
            </select>
            <textarea
              placeholder="Contenu"
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
              rows={6}
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
        {pages.map((page) => (
          <div key={page.id} className="flex justify-between items-center p-4 bg-white border border-neutral-200 rounded">
            <div>
              <h3 className="font-medium">{page.title}</h3>
              <p className="text-sm text-neutral-600">{page.type} • /{page.slug}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(page);
                  setEditingId(page.id);
                  setShowForm(true);
                }}
                className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(page.id)}
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
