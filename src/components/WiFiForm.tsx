import { useState } from 'react';
import type { WiFiData } from '../types';

interface Props {
  data: WiFiData;
  onChange: (data: WiFiData) => void;
}

const inputClass = `
  w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5
  text-sm text-[#1e3a5f] placeholder-[#94a3b8]
  focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
  font-mono
`;

const labelClass = 'block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium';

export function WiFiForm({ data, onChange }: Props) {
  const [showPass, setShowPass] = useState(false);
  const set = <K extends keyof WiFiData>(key: K) => (v: WiFiData[K]) =>
    onChange({ ...data, [key]: v });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className={labelClass}>Nombre de la red (SSID)</label>
        <input
          type="text"
          value={data.ssid}
          onChange={(e) => set('ssid')(e.target.value)}
          placeholder="Mi Red WiFi"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Contraseña</label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={data.password}
            onChange={(e) => set('password')(e.target.value)}
            placeholder="••••••••"
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b] transition-colors"
          >
            {showPass ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div>
        <label className={labelClass}>Seguridad</label>
        <select
          value={data.security}
          onChange={(e) => set('security')(e.target.value as WiFiData['security'])}
          className="
            w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5
            text-sm text-[#1e3a5f]
            focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
          "
        >
          <option value="WPA">WPA / WPA2 / WPA3 (recomendado)</option>
          <option value="WEP">WEP (antiguo)</option>
          <option value="nopass">Sin contraseña (red abierta)</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm text-[#475569] cursor-pointer">
        <input
          type="checkbox"
          checked={data.hidden}
          onChange={(e) => set('hidden')(e.target.checked)}
          className="accent-[#2563eb] w-4 h-4"
        />
        Red oculta (no transmite SSID)
      </label>

      {data.ssid && (
        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg px-3 py-2.5">
          <p className="text-xs text-[#2563eb] font-mono">
            Red: {data.ssid} · {data.security}{data.hidden ? ' · Oculta' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
