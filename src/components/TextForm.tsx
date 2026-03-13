import type { TextData } from '../types';

interface Props {
  data: TextData;
  onChange: (data: TextData) => void;
}

export function TextForm({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium">
          Texto
        </label>
        <textarea
          value={data.text}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="Escribe el texto que quieres codificar en el QR..."
          rows={5}
          className="
            w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5
            text-sm text-[#1e3a5f] placeholder-[#94a3b8] resize-none
            focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
            font-mono
          "
        />
        <p className="text-xs text-[#94a3b8] mt-1.5 font-mono">
          {data.text.length} caracteres
        </p>
      </div>
    </div>
  );
}
