import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../utils/api';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size', '2-3Y', '4-5Y', '6-7Y', '8-9Y'];

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', description: '', price: '', mrp: '', category: '', subcategory: '',
    sku: '', stock: '', colors: '', images: '', inStock: true, isFeatured: false,
  });
  const [sizes, setSizes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = 'Add Product — Like N Like Admin'; }, []);

  const toggleSize = (size) => {
    setSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  };

  const handleChange = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [field]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.price || !form.category) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        mrp: parseFloat(form.mrp) || 0,
        stock: parseInt(form.stock) || 0,
        colors: form.colors.split(',').map((c) => c.trim()).filter(Boolean),
        images: form.images.split('\n').map((u) => u.trim()).filter(Boolean),
        sizes,
      };

      const res = await API.post('/products', payload);
      if (res.data.success) {
        setSuccess('✅ Product added successfully!');
        setForm({ name: '', description: '', price: '', mrp: '', category: '', subcategory: '', sku: '', stock: '', colors: '', images: '', inStock: true, isFeatured: false });
        setSizes([]);
        setTimeout(() => navigate('/admin'), 1500);
      } else {
        setError(res.data.message || 'Failed to add product.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const Section = ({ num, title, color, children }) => (
    <div className="card p-6">
      <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className={`w-6 h-6 ${color} rounded-lg flex items-center justify-center text-xs font-black`}>{num}</span>
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin" className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Add Product</h1>
          <p className="text-gray-500 text-sm">Add a new product to your store</p>
        </div>
      </div>

      {error && <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">{error}</div>}
      {success && <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <Section num="1" title="Basic Information" color="bg-orange-100 text-orange-600">
          <div className="space-y-4">
            <div>
              <label className="label">Product Name <span className="text-red-400">*</span></label>
              <input value={form.name} onChange={handleChange('name')} required placeholder="e.g. Classic White Oxford Shirt" className="input-field" />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea value={form.description} onChange={handleChange('description')} rows={3} placeholder="Describe your product..." className="input-field resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Category <span className="text-red-400">*</span></label>
                <select value={form.category} onChange={handleChange('category')} required className="input-field appearance-none">
                  <option value="">Select Category</option>
                  <option value="men">👔 Men</option>
                  <option value="women">👗 Women</option>
                  <option value="kids">🧒 Kids</option>
                </select>
              </div>
              <div>
                <label className="label">Subcategory</label>
                <input value={form.subcategory} onChange={handleChange('subcategory')} placeholder="e.g. Shirts, Dresses" className="input-field" />
              </div>
            </div>
          </div>
        </Section>

        {/* Pricing */}
        <Section num="2" title="Pricing & Stock" color="bg-green-100 text-green-600">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { field: 'price', label: 'Sale Price (₹)', placeholder: '799', required: true },
              { field: 'mrp', label: 'MRP (₹)', placeholder: '1299', required: false },
              { field: 'stock', label: 'Stock Qty', placeholder: '50', required: false },
              { field: 'sku', label: 'SKU', placeholder: 'MEN-001', required: false },
            ].map(({ field, label, placeholder, required }) => (
              <div key={field}>
                <label className="label">{label} {required && <span className="text-red-400">*</span>}</label>
                <input value={form[field]} onChange={handleChange(field)} required={required} placeholder={placeholder} className="input-field" type={field === 'sku' ? 'text' : 'number'} min={0} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.inStock} onChange={handleChange('inStock')} className="w-4 h-4 rounded accent-brand-500" />
              <span className="text-sm font-semibold text-gray-700">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={handleChange('isFeatured')} className="w-4 h-4 rounded accent-brand-500" />
              <span className="text-sm font-semibold text-gray-700">🔥 Feature (Recent Hits)</span>
            </label>
          </div>
        </Section>

        {/* Variants */}
        <Section num="3" title="Sizes & Colors" color="bg-blue-100 text-blue-600">
          <div className="mb-4">
            <label className="label mb-2">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-all ${sizes.includes(size) ? 'bg-brand-500 text-white border-brand-500' : 'border-gray-200 text-gray-600 hover:border-brand-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Colors (comma-separated)</label>
            <input value={form.colors} onChange={handleChange('colors')} placeholder="Red, Blue, White, Black" className="input-field" />
          </div>
        </Section>

        {/* Images */}
        <Section num="4" title="Product Images" color="bg-purple-100 text-purple-600">
          <label className="label">Image URLs (one per line)</label>
          <textarea
            value={form.images}
            onChange={handleChange('images')}
            rows={3}
            placeholder={"https://images.unsplash.com/photo-xxx\nhttps://example.com/product.jpg"}
            className="input-field resize-none font-mono text-xs"
          />
          <p className="text-xs text-gray-400 mt-1.5">First image = main product image.</p>
        </Section>

        {/* Actions */}
        <div className="flex gap-3">
          <Link to="/admin" className="flex-1 py-3.5 text-center btn-outline">Cancel</Link>
          <button type="submit" disabled={loading} className="flex-1 btn-primary flex items-center justify-center gap-2">
            {loading ? (
              <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" /><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Adding...</>
            ) : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
