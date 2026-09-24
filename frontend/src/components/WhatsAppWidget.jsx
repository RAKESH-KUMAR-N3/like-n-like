import { useState } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '919876543210'; // Replace with store official WhatsApp

  const handleStartChat = (customText) => {
    const defaultText = customText || 'Hi Like N Like, I have an inquiry about my order / shopping.';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Mini Popup Drawer */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-float">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
                💬
              </div>
              <div>
                <h4 className="font-bold text-sm">Like N Like Concierge</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Typically replies in minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white text-lg font-bold p-1"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-gray-50/50 text-xs">
            <p className="text-gray-600 leading-relaxed bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
              Hello! 👋 Need help with an order, sizing, or styling advice? Tap an option below to chat directly with us on WhatsApp!
            </p>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => handleStartChat('Hi, I need help tracking my order.')}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200/80 rounded-xl font-semibold transition-colors flex items-center justify-between"
              >
                <span>📦 Track My Order</span>
                <span>→</span>
              </button>
              <button
                onClick={() => handleStartChat('Hi, can you help me with sizing for an item?')}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200/80 rounded-xl font-semibold transition-colors flex items-center justify-between"
              >
                <span>📏 Sizing & Fit Help</span>
                <span>→</span>
              </button>
              <button
                onClick={() => handleStartChat('Hi, I want to inquire about return/exchange.')}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200/80 rounded-xl font-semibold transition-colors flex items-center justify-between"
              >
                <span>🔄 Return / Exchange Help</span>
                <span>→</span>
              </button>
            </div>

            <button
              onClick={() => handleStartChat()}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Open WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        {/* Pulsing Green Glow Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />

        {/* WhatsApp SVG Icon */}
        <svg className="w-7 h-7 relative z-10 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347m-5.421 7.403" />
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        </svg>

        {/* Tooltip on Hover */}
        <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Chat with us on WhatsApp 💬
        </span>
      </button>
    </div>
  );
}
