import type { VCardData } from '../types';

interface Props {
  data: VCardData;
  onChange: (data: VCardData) => void;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  half = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  half?: boolean;
}) {
  return (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="block text-xs text-[#666] uppercase tracking-widest mb-1.5 font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2.5
          text-sm text-[#f5f5f5] placeholder-[#444]
          focus:outline-none focus:border-[#555] focus:bg-[#161616]
          font-mono
        "
      />
    </div>
  );
}

export function VCardForm({ data, onChange }: Props) {
  const set = (key: keyof VCardData) => (v: string) => onChange({ ...data, [key]: v });

  return (
    <div className="grid grid-cols-2 gap-3">
      <Field label="First Name" value={data.firstName} onChange={set('firstName')} placeholder="John" half />
      <Field label="Last Name" value={data.lastName} onChange={set('lastName')} placeholder="Doe" half />
      <Field label="Company" value={data.company} onChange={set('company')} placeholder="Acme Corp" />
      <Field label="Job Title" value={data.title} onChange={set('title')} placeholder="Sales Manager" />
      <Field label="Work Phone" value={data.phone} onChange={set('phone')} placeholder="+1 555 000 0000" type="tel" half />
      <Field label="Mobile" value={data.mobile} onChange={set('mobile')} placeholder="+1 555 000 0001" type="tel" half />
      <Field label="Email" value={data.email} onChange={set('email')} placeholder="john@acme.com" type="email" />
      <Field label="Website" value={data.website} onChange={set('website')} placeholder="https://acme.com" />
      <Field label="Address" value={data.address} onChange={set('address')} placeholder="123 Main St" />
      <Field label="City" value={data.city} onChange={set('city')} placeholder="New York" half />
      <Field label="Country" value={data.country} onChange={set('country')} placeholder="USA" half />
    </div>
  );
}
