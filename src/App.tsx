import { useState } from 'react';
import { TypeSelector } from './components/TypeSelector';
import { VCardForm } from './components/VCardForm';
import { WhatsAppForm } from './components/WhatsAppForm';
import { StylePanel } from './components/StylePanel';
import { QRPreview } from './components/QRPreview';
import { buildVCardString, buildWhatsAppString } from './utils/qrData';
import type { QRType, VCardData, WhatsAppData, QRStyle } from './types';

const DEFAULT_VCARD: VCardData = {
  firstName: '',
  lastName: '',
  company: '',
  title: '',
  phone: '',
  mobile: '',
  email: '',
  website: '',
  address: '',
  city: '',
  country: '',
};

const DEFAULT_WHATSAPP: WhatsAppData = {
  phone: '',
  message: '',
};

const DEFAULT_STYLE: QRStyle = {
  foreground: '#000000',
  background: '#ffffff',
  cornerColor: '#000000',
  cornerStyle: 'square',
  dotStyle: 'square',
  logoUrl: null,
  logoSize: 20,
  scanText: 'Scan me!',
  scanTextColor: '#1a73e8',
  showScanArrow: true,
};

export default function App() {
  const [qrType, setQrType] = useState<QRType>('vcard');
  const [vcard, setVcard] = useState<VCardData>(DEFAULT_VCARD);
  const [whatsapp, setWhatsapp] = useState<WhatsAppData>(DEFAULT_WHATSAPP);
  const [qrStyle, setQrStyle] = useState<QRStyle>(DEFAULT_STYLE);
  const [activeTab, setActiveTab] = useState<'data' | 'style'>('data');

  const qrData =
    qrType === 'vcard'
      ? buildVCardString(vcard)
      : buildWhatsAppString(whatsapp);

  const hasData =
    qrType === 'vcard'
      ? !!(vcard.firstName || vcard.lastName || vcard.phone || vcard.email)
      : !!whatsapp.phone;

  return (
    <div className="min-h-screen bg-white text-[#1e3a5f]">
      {/* Header */}
      <header className="border-b border-[#e2e8f0] bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="8" height="8" rx="1" />
                <rect x="14" y="2" width="8" height="8" rx="1" />
                <rect x="2" y="14" width="8" height="8" rx="1" />
                <rect x="14" y="14" width="4" height="4" rx="0.5" />
                <rect x="20" y="14" width="2" height="2" rx="0.5" />
                <rect x="14" y="20" width="2" height="2" rx="0.5" />
                <rect x="18" y="18" width="4" height="4" rx="0.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider text-[#1e3a5f] uppercase font-mono leading-none">
                Aigents
              </h1>
              <p className="text-xs text-[#64748b] font-mono tracking-widest leading-none mt-0.5">
                QR CODE MAKER
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-[#94a3b8] font-mono">v1.0</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#1e3a5f] tracking-tight mb-2">
            Professional QR Code Generator
          </h2>
          <p className="text-[#64748b] text-sm font-mono">
            VCARD &nbsp;·&nbsp; WhatsApp &nbsp;·&nbsp; Custom branding &nbsp;·&nbsp; Instant download
          </p>
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_300px] gap-5 items-start">

          {/* ── Column 1: Data entry ── */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl overflow-hidden">
            {/* Type selector */}
            <div className="p-5 border-b border-[#e2e8f0]">
              <p className="text-xs text-[#64748b] uppercase tracking-widest mb-3 font-mono">
                QR Code Type
              </p>
              <TypeSelector selected={qrType} onChange={setQrType} />
            </div>

            {/* Mobile tabs */}
            <div className="flex border-b border-[#e2e8f0] lg:hidden">
              {(['data', 'style'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex-1 py-3 text-xs uppercase tracking-widest font-medium transition-colors
                    ${activeTab === tab
                      ? 'text-[#2563eb] border-b-2 border-[#2563eb] -mb-px'
                      : 'text-[#94a3b8] hover:text-[#64748b]'}
                  `}
                >
                  {tab === 'data' ? 'Contact Info' : 'Style'}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="p-5">
              <div className={activeTab === 'data' ? 'block' : 'hidden lg:block'}>
                <p className="text-xs text-[#94a3b8] uppercase tracking-widest font-mono mb-4">
                  {qrType === 'vcard' ? '— Contact Information' : '— WhatsApp Link'}
                </p>
                {qrType === 'vcard'
                  ? <VCardForm data={vcard} onChange={setVcard} />
                  : <WhatsAppForm data={whatsapp} onChange={setWhatsapp} />
                }
              </div>
              <div className={activeTab === 'style' ? 'block lg:hidden' : 'hidden'}>
                <StylePanel style={qrStyle} onChange={setQrStyle} />
              </div>
            </div>
          </div>

          {/* ── Column 2: Style panel (desktop only) ── */}
          <div className="hidden lg:block bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-5">
            <p className="text-xs text-[#94a3b8] uppercase tracking-widest font-mono mb-4">
              — Appearance
            </p>
            <StylePanel style={qrStyle} onChange={setQrStyle} />
          </div>

          {/* ── Column 3: Preview ── */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-5">
            <p className="text-xs text-[#94a3b8] uppercase tracking-widest font-mono mb-4">
              — Preview
            </p>

            {!hasData && (
              <div className="text-center py-4 mb-4 border border-dashed border-[#e2e8f0] rounded-xl">
                <p className="text-xs text-[#94a3b8] font-mono">
                  Fill in {qrType === 'vcard' ? 'contact info' : 'a phone number'}<br />
                  to generate your QR code
                </p>
              </div>
            )}

            <QRPreview
              data={hasData ? qrData : 'AIGENTS QR CODE MAKER'}
              style={qrStyle}
              label={qrType}
            />

            {/* Encoded data inspector */}
            <div className="mt-5 pt-4 border-t border-[#e2e8f0]">
              <p className="text-xs text-[#94a3b8] uppercase tracking-widest font-mono mb-2">
                Encoded content
              </p>
              <div className="bg-white border border-[#e2e8f0] rounded-lg p-3 max-h-24 overflow-y-auto">
                <pre className="text-xs text-[#64748b] font-mono whitespace-pre-wrap break-all">
                  {hasData ? qrData : '—'}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-[#e2e8f0] flex items-center justify-between">
          <p className="text-xs text-[#94a3b8] font-mono">
            AIGENTS QR CODE MAKER
          </p>
          <p className="text-xs text-[#94a3b8] font-mono">
            Built for professionals
          </p>
        </footer>
      </main>
    </div>
  );
}
