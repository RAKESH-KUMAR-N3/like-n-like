import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Policies() {
  const [activeTab, setActiveTab] = useState('returns');
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafc] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Customer Care & Policies
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-gray-900">
            We're Here For You.
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Transparent policies, dedicated support, and 100% satisfaction guaranteed.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-2xl p-1.5 border border-gray-200/80 shadow-sm gap-1">
            {[
              { id: 'returns', label: '🔄 Returns & Exchanges' },
              { id: 'shipping', label: '🚚 Shipping Policy' },
              { id: 'contact', label: '📞 Contact Support' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: RETURNS & EXCHANGES */}
        {activeTab === 'returns' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-luxe space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <span className="text-3xl">🔄</span>
              <div>
                <h2 className="text-xl font-black text-gray-900 font-display">7 Days Hassle-Free Returns & Exchanges</h2>
                <p className="text-xs text-gray-400">Zero questions asked doorstep pickup</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-900">
                <p className="font-bold">⚡ How to initiate a return or size exchange?</p>
                <p className="text-xs text-amber-800 mt-1">
                  Simply navigate to <Link to="/my-orders" className="underline font-bold text-amber-900">My Orders</Link>, click on your delivered order, and select <strong>"Request Return / Exchange"</strong>. Our courier executive will arrive at your doorstep for pickup within 48-72 hours!
                </p>
              </div>

              <h3 className="font-black text-gray-900 uppercase tracking-wider text-xs pt-2">Eligibility Criteria:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Items must be returned within <strong>7 days</strong> of delivery.</li>
                <li>Apparel must be unused, unwashed, and with all original brand tags intact.</li>
                <li>Size exchanges are 100% free of charge! We dispatch your replacement size as soon as pickup is confirmed.</li>
                <li>Refunds for returns are processed directly to your <strong>UPI ID or Bank Account</strong> within 24-48 hours of quality inspection.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: SHIPPING POLICY */}
        {activeTab === 'shipping' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-luxe space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <span className="text-3xl">🚚</span>
              <div>
                <h2 className="text-xl font-black text-gray-900 font-display">Fast Express Shipping</h2>
                <p className="text-xs text-gray-400">Delivering fashion safely across all Indian pin codes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-2xl block mb-1">⚡</span>
                <h4 className="font-bold text-gray-900 text-sm">Express Dispatch</h4>
                <p className="text-xs text-gray-500 mt-1">All orders are packed and dispatched within 24 hours of confirmation.</p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-2xl block mb-1">🎁</span>
                <h4 className="font-bold text-gray-900 text-sm">Free Shipping Over ₹999</h4>
                <p className="text-xs text-gray-500 mt-1">Enjoy zero delivery fees on orders above ₹999 anywhere in India.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
              <p>• <strong>Metro Cities:</strong> Delivery within 2 - 4 business days.</p>
              <p>• <strong>Rest of India:</strong> Delivery within 4 - 6 business days.</p>
              <p>• <strong>Live Tracking:</strong> You receive an instant tracking link via SMS/WhatsApp as soon as your package is dispatched.</p>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT FORM */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-luxe space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <span className="text-3xl">📞</span>
              <div>
                <h2 className="text-xl font-black text-gray-900 font-display">Get in Touch</h2>
                <p className="text-xs text-gray-400">Our customer team is available Mon-Sat, 9 AM - 8 PM IST</p>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl text-emerald-800">
                <span className="text-4xl block mb-2">💌</span>
                <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                <p className="text-xs mt-1">Thank you for reaching out. An executive will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="Your Email"
                      className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Message / Inquiry</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-gray-900 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
