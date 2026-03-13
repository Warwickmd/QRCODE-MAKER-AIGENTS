import type { PhoneData } from '../types';

interface Props {
  data: PhoneData;
  onChange: (data: PhoneData) => void;
}

const COUNTRY_CODES = [
  { code: '+1', label: '🇺🇸 +1 (USA / CAN)' },
  { code: '+52', label: '🇲🇽 +52 (México)' },
  { code: '+34', label: '🇪🇸 +34 (España)' },
  { code: '+57', label: '🇨🇴 +57 (Colombia)' },
  { code: '+54', label: '🇦🇷 +54 (Argentina)' },
  { code: '+56', label: '🇨🇱 +56 (Chile)' },
  { code: '+51', label: '🇵🇪 +51 (Perú)' },
  { code: '+58', label: '🇻🇪 +58 (Venezuela)' },
  { code: '+593', label: '🇪🇨 +593 (Ecuador)' },
  { code: '+502', label: '🇬🇹 +502 (Guatemala)' },
  { code: '+44', label: '🇬🇧 +44 (UK)' },
  { code: '+49', label: '🇩🇪 +49 (Alemania)' },
  { code: '+33', label: '🇫🇷 +33 (Francia)' },
  { code: '+55', label: '🇧🇷 +55 (Brasil)' },
];

export function PhoneForm({ data, onChange }: Props) {
  // Split stored phone into country code + number
  const matchedCode = COUNTRY_CODES.find((c) => data.phone.startsWith(c.code));
  const countryCode = matchedCode?.code ?? '+1';
  const localNumber = matchedCode ? data.phone.slice(countryCode.length).trimStart() : data.phone;

  const handleCodeChange = (code: string) => {
    onChange({ phone: `${code}${localNumber}` });
  };
  const handleNumberChange = (num: string) => {
    onChange({ phone: `${countryCode}${num}` });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium">
          Código de país
        </label>
        <select
          value={countryCode}
          onChange={(e) => handleCodeChange(e.target.value)}
          className="
            w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5
            text-sm text-[#1e3a5f]
            focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
          "
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-[#1e40af] uppercase tracking-widest mb-1.5 font-medium">
          Número de teléfono
        </label>
        <input
          type="tel"
          value={localNumber}
          onChange={(e) => handleNumberChange(e.target.value)}
          placeholder="555 000 0000"
          className="
            w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5
            text-sm text-[#1e3a5f] placeholder-[#94a3b8]
            focus:outline-none focus:border-[#3b82f6] focus:bg-[#f8fafc]
            font-mono
          "
        />
      </div>
      {data.phone.replace(/[^0-9]/g, '') && (
        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg px-3 py-2.5">
          <p className="text-xs text-[#2563eb] font-mono">
            QR generará: tel:{countryCode}{localNumber}
          </p>
        </div>
      )}
    </div>
  );
}
