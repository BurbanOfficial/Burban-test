'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Banner } from '@/lib/types';

export default function BannersManager() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Banner>>({
    type: 'text',
    content: '',
    buttonText: '',
    buttonLink: '',
    duration: 5,
    active: true,
    order: 0,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'banners'));
      setBanners(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Banner)));
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateDoc(doc(db, 'banners', editingId), formData);
      } else {
        await addDoc(collection(db, 'banners'), formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        type: 'text',
        content: '',
        buttonText: '',
        buttonLink: '',
        duration: 5,
        active: true,
        order: 0,
      });
      fetchBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return;
    try {
      await deleteDoc(doc(db, 'banners', id));
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Bannières</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
          className="px-4 py-2 bg-accent text-white rounded hover:bg-neutral-800"
        >
          {showForm ? 'Annuler' : 'Ajouter une bannière'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded border border-neutral-200 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={formData.type || 'text'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'text' | 'image' })}
                className="w-full px-3 py-2 border border-neutral-300 rounded"
              >
                <option value="text">Texte</option>
                <option value="image">Image</option>
              </select>
            </div>
            <textarea
              placeholder="Contenu"
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
              rows={3}
            />
            <input
              type="text"
              placeholder="Texte du bouton"
              value={formData.buttonText || ''}
              onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
            />
            <input
              type="text"
              placeholder="Lien du bouton"
              value={formData.buttonLink || ''}
              onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Durée (secondes)"
                value={formData.duration || 5}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="px-3 py-2 border border-neutral-300 rounded"
              />
              <input
                type="number"
                placeholder="Ordre"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="px-3 py-2 border border-neutral-300 rounded"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.active || false}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
              <span>Actif</span>
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
        {banners.map((banner) => (
          <div key={banner.id} className="flex justify-between items-center p-4 bg-white border border-neutral-200 rounded">
            <div>
              <h3 className="font-medium">{banner.type === 'text' ? banner.content : 'Image'}</h3>
              <p className="text-sm text-neutral-600">{banner.duration}s • {banner.active ? 'Actif' : 'Inactif'}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(banner);
                  setEditingId(banner.id);
                  setShowForm(true);
                }}
                className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(banner.id)}
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
