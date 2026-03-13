import type { URLData } from '../types';

interface Props {
  data: URLData;
  onChange: (data: URLData) => void;
}

export function URLForm({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium">
          URL / Enlace
        </label>
        <input
          type="url"
          value={data.url}
          onChange={(e) => onChange({ url: e.target.value })}
          placeholder="https://ejemplo.com"
          className="
            w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5
            text-sm text-[#1e3a5f] placeholder-[#94a3b8]
            focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
            font-mono
          "
        />
        <p className="text-xs text-[#94a3b8] mt-1.5 font-mono">
          Si no incluyes https://, se agregará automáticamente.
        </p>
      </div>
    </div>
  );
}
