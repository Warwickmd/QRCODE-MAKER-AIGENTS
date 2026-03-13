import type { EmailData } from '../types';

interface Props {
  data: EmailData;
  onChange: (data: EmailData) => void;
}

const inputClass = `
  w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5
  text-sm text-[#1e3a5f] placeholder-[#94a3b8]
  focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
  font-mono
`;

const labelClass = 'block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium';

export function EmailForm({ data, onChange }: Props) {
  const set = (key: keyof EmailData) => (v: string) => onChange({ ...data, [key]: v });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className={labelClass}>Para (Email)</label>
        <input
          type="email"
          value={data.to}
          onChange={(e) => set('to')(e.target.value)}
          placeholder="destinatario@ejemplo.com"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Asunto <span className="normal-case text-[#94a3b8]">(opcional)</span></label>
        <input
          type="text"
          value={data.subject}
          onChange={(e) => set('subject')(e.target.value)}
          placeholder="Hola, me pongo en contacto..."
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Mensaje <span className="normal-case text-[#94a3b8]">(opcional)</span></label>
        <textarea
          value={data.body}
          onChange={(e) => set('body')(e.target.value)}
          placeholder="Escribe el cuerpo del correo..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>
    </div>
  );
}
