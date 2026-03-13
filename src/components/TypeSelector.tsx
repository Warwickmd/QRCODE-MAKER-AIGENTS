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
                ? 'border-white bg-white text-black'
                : 'border-[#2a2a2a] bg-[#111111] text-[#888888] hover:border-[#3a3a3a] hover:text-[#cccccc]'
            }
          `}
        >
          <span className="text-2xl">{t.icon}</span>
          <span className="font-semibold tracking-wide text-xs uppercase">{t.label}</span>
          <span className={`text-xs font-normal ${selected === t.id ? 'text-[#555]' : 'text-[#555]'}`}>
            {t.desc}
          </span>
        </button>
      ))}
    </div>
  );
}
