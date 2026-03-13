import type { WhatsAppData } from '../types';

interface Props {
  data: WhatsAppData;
  onChange: (data: WhatsAppData) => void;
}

export function WhatsAppForm({ data, onChange }: Props) {
  const set = (key: keyof WhatsAppData) => (v: string) =>
    onChange({ ...data, [key]: v });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium">
          WhatsApp Phone Number
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] text-sm font-mono">+</span>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => set('phone')(e.target.value)}
            placeholder="1 555 000 0000"
            className="
              w-full bg-white border border-[#e2e8f0] rounded-lg pl-7 pr-3 py-2.5
              text-sm text-[#1e3a5f] placeholder-[#94a3b8]
              focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
              font-mono
            "
          />
        </div>
        <p className="text-xs text-[#94a3b8] mt-1.5 font-mono">
          Include country code. Example: 1 555 000 0000
        </p>
      </div>

      <div>
        <label className="block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium">
          Pre-filled Message <span className="normal-case text-[#94a3b8]">(optional)</span>
        </label>
        <textarea
          value={data.message}
          onChange={(e) => set('message')(e.target.value)}
          placeholder="Hello! I'd like to know more about..."
          rows={4}
          className="
            w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5
            text-sm text-[#1e3a5f] placeholder-[#94a3b8] resize-none
            focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
            font-mono
          "
        />
      </div>

      {data.phone && (
        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg px-3 py-2.5">
          <p className="text-xs text-[#2563eb] font-mono">
            Preview: wa.me/{data.phone.replace(/[^0-9]/g, '')}
            {data.message ? `?text=${encodeURIComponent(data.message).slice(0, 30)}...` : ''}
          </p>
        </div>
      )}
    </div>
  );
}
