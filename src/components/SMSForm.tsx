import type { SMSData } from '../types';

interface Props {
  data: SMSData;
  onChange: (data: SMSData) => void;
}

const inputClass = `
  w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5
  text-sm text-[#1e3a5f] placeholder-[#94a3b8]
  focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
  font-mono
`;

export function SMSForm({ data, onChange }: Props) {
  const set = (key: keyof SMSData) => (v: string) => onChange({ ...data, [key]: v });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium">
          Número de teléfono
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] text-sm font-mono">+</span>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => set('phone')(e.target.value)}
            placeholder="1 555 000 0000"
            className={`${inputClass} pl-7`}
          />
        </div>
        <p className="text-xs text-[#94a3b8] mt-1.5 font-mono">
          Incluye el código de país (ej: 52 para México)
        </p>
      </div>
      <div>
        <label className="block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium">
          Mensaje <span className="normal-case text-[#94a3b8]">(opcional)</span>
        </label>
        <textarea
          value={data.message}
          onChange={(e) => set('message')(e.target.value)}
          placeholder="Hola, me contacto por..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>
      {data.phone && (
        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg px-3 py-2.5">
          <p className="text-xs text-[#2563eb] font-mono">
            QR generará: smsto:+{data.phone.replace(/[^0-9]/g, '')}
            {data.message ? `:${data.message.slice(0, 25)}...` : ''}
          </p>
        </div>
      )}
    </div>
  );
}
