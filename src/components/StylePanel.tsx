import { useRef } from 'react';
import type { QRStyle, CornerStyle, DotStyle } from '../types';

interface Props {
  style: QRStyle;
  onChange: (style: QRStyle) => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs text-[#64748b] uppercase tracking-widest mb-3 font-medium">{title}</h3>
      {children}
    </div>
  );
}

function ColorSwatch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        className="w-9 h-9 rounded-lg border border-[#e2e8f0] overflow-hidden flex-shrink-0 group-hover:border-[#93c5fd] transition-colors"
        style={{ background: value }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div>
        <div className="text-xs text-[#475569] font-medium">{label}</div>
        <div className="text-xs text-[#94a3b8] font-mono uppercase">{value}</div>
      </div>
    </label>
  );
}

const DOT_STYLES: { id: DotStyle; label: string; preview: string }[] = [
  { id: 'square', label: 'Square', preview: '▪' },
  { id: 'dots', label: 'Dots', preview: '●' },
  { id: 'rounded', label: 'Rounded', preview: '▪' },
  { id: 'classy', label: 'Classy', preview: '◆' },
  { id: 'classy-rounded', label: 'Classy R.', preview: '◆' },
  { id: 'extra-rounded', label: 'Extra R.', preview: '○' },
];

const CORNER_STYLES: { id: CornerStyle; label: string; preview: string }[] = [
  { id: 'square', label: 'Square', preview: '⬜' },
  { id: 'rounded', label: 'Rounded', preview: '▢' },
  { id: 'dots', label: 'Dots', preview: '○' },
];

export function StylePanel({ style, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const set = (key: keyof QRStyle) => (v: unknown) => onChange({ ...style, [key]: v });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ ...style, logoUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Colors */}
      <Section title="Colors">
        <div className="flex flex-col gap-3">
          <ColorSwatch label="QR Foreground" value={style.foreground} onChange={set('foreground')} />
          <ColorSwatch label="Background" value={style.background} onChange={set('background')} />
          <ColorSwatch label="Corner Color" value={style.cornerColor} onChange={set('cornerColor')} />
        </div>
      </Section>

      {/* Dot Pattern */}
      <Section title="Dot Pattern">
        <div className="grid grid-cols-3 gap-2">
          {DOT_STYLES.map((ds) => (
            <button
              key={ds.id}
              onClick={() => set('dotStyle')(ds.id)}
              className={`
                py-2 px-1 rounded-lg border text-xs font-medium transition-all
                ${
                  style.dotStyle === ds.id
                    ? 'border-[#2563eb] bg-[#2563eb] text-white'
                    : 'border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#93c5fd] hover:text-[#1e40af]'
                }
              `}
            >
              <div className="text-base mb-0.5">{ds.preview}</div>
              {ds.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Corner Style */}
      <Section title="Corner Style">
        <div className="grid grid-cols-3 gap-2">
          {CORNER_STYLES.map((cs) => (
            <button
              key={cs.id}
              onClick={() => set('cornerStyle')(cs.id)}
              className={`
                py-2 px-1 rounded-lg border text-xs font-medium transition-all
                ${
                  style.cornerStyle === cs.id
                    ? 'border-[#2563eb] bg-[#2563eb] text-white'
                    : 'border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#93c5fd] hover:text-[#1e40af]'
                }
              `}
            >
              <div className="text-base mb-0.5">{cs.preview}</div>
              {cs.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Center Logo */}
      <Section title="Center Logo">
        <div
          onClick={() => fileRef.current?.click()}
          className="
            border-2 border-dashed border-[#e2e8f0] rounded-xl p-4 text-center cursor-pointer
            hover:border-[#93c5fd] hover:bg-[#f8fafc] transition-all
          "
        >
          {style.logoUrl ? (
            <div className="flex flex-col items-center gap-2">
              <img
                src={style.logoUrl}
                alt="Logo"
                className="w-16 h-16 object-contain rounded-lg"
              />
              <span className="text-xs text-[#64748b]">Click to change</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <svg className="w-8 h-8 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-[#64748b]">Upload logo</span>
              <span className="text-xs text-[#94a3b8]">PNG, JPG, SVG</span>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>
        {style.logoUrl && (
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#64748b]">Logo size: {style.logoSize}%</span>
              <button
                onClick={() => onChange({ ...style, logoUrl: null })}
                className="text-xs text-[#64748b] hover:text-[#1e40af] transition-colors"
              >
                Remove
              </button>
            </div>
            <input
              type="range"
              min={10}
              max={40}
              value={style.logoSize}
              onChange={(e) => set('logoSize')(Number(e.target.value))}
              className="w-full accent-[#2563eb]"
            />
          </div>
        )}
      </Section>

      {/* Scan Text */}
      <Section title="Scan Label">
        <div className="flex flex-col gap-2.5">
          <div>
            <label className="block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5">Text</label>
            <input
              type="text"
              value={style.scanText}
              onChange={(e) => set('scanText')(e.target.value)}
              placeholder="Scan me!"
              className="
                w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2
                text-sm text-[#1e3a5f] placeholder-[#94a3b8]
                focus:outline-none focus:border-[#3b82f6]
                font-mono
              "
            />
          </div>
          <div className="flex items-center gap-3">
            <ColorSwatch
              label="Text Color"
              value={style.scanTextColor}
              onChange={set('scanTextColor')}
            />
            <label className="flex items-center gap-2 text-xs text-[#64748b] cursor-pointer ml-auto">
              <input
                type="checkbox"
                checked={style.showScanArrow}
                onChange={(e) => set('showScanArrow')(e.target.checked)}
                className="accent-[#2563eb]"
              />
              Show arrow
            </label>
          </div>
        </div>
      </Section>
    </div>
  );
}
