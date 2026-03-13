import type { QRType } from '../types';

interface Props {
  selected: QRType;
  onChange: (type: QRType) => void;
}

const types: { id: QRType; label: string; icon: string; desc: string }[] = [
  {
    id: 'vcard',
    label: 'VCARD',
    icon: '👤',
    desc: 'Business card / contact',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: '💬',
    desc: 'Chat link with message',
  },
];

export function TypeSelector({ selected, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {types.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`
            flex-1 flex flex-col items-center gap-2 px-4 py-4 rounded-xl border
            font-medium text-sm transition-all duration-200
            ${
              selected === t.id
                ? 'border-[#2563eb] bg-[#2563eb] text-white'
                : 'border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#93c5fd] hover:text-[#1e40af]'
            }
          `}
        >
          <span className="text-2xl">{t.icon}</span>
          <span className="font-semibold tracking-wide text-xs uppercase">{t.label}</span>
          <span className={`text-xs font-normal ${selected === t.id ? 'text-[#bfdbfe]' : 'text-[#94a3b8]'}`}>
            {t.desc}
          </span>
        </button>
      ))}
    </div>
  );
}
