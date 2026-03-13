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
        <label className="block text-xs text-[#666] uppercase tracking-widest mb-1.5 font-medium">
          WhatsApp Phone Number
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-sm font-mono">+</span>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => set('phone')(e.target.value)}
            placeholder="1 555 000 0000"
            className="
              w-full bg-[#111] border border-[#2a2a2a] rounded-lg pl-7 pr-3 py-2.5
              text-sm text-[#f5f5f5] placeholder-[#444]
              focus:outline-none focus:border-[#555] focus:bg-[#161616]
              font-mono
            "
          />
        </div>
        <p className="text-xs text-[#444] mt-1.5 font-mono">
          Include country code. Example: 1 555 000 0000
        </p>
      </div>

      <div>
        <label className="block text-xs text-[#666] uppercase tracking-widest mb-1.5 font-medium">
          Pre-filled Message <span className="normal-case text-[#444]">(optional)</span>
        </label>
        <textarea
          value={data.message}
          onChange={(e) => set('message')(e.target.value)}
          placeholder="Hello! I'd like to know more about..."
          rows={4}
          className="
            w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2.5
            text-sm text-[#f5f5f5] placeholder-[#444] resize-none
            focus:outline-none focus:border-[#555] focus:bg-[#161616]
            font-mono
          "
        />
      </div>

      {data.phone && (
        <div className="bg-[#0d1a0d] border border-[#1a3a1a] rounded-lg px-3 py-2.5">
          <p className="text-xs text-[#3a8a3a] font-mono">
            Preview: wa.me/{data.phone.replace(/[^0-9]/g, '')}
            {data.message ? `?text=${encodeURIComponent(data.message).slice(0, 30)}...` : ''}
          </p>
        </div>
      )}
    </div>
  );
}
