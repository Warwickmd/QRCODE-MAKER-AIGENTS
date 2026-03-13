import type { VCardData, WhatsAppData, URLData, TextData, EmailData, PhoneData, SMSData, WiFiData } from '../types';

export function buildVCardString(data: VCardData): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.firstName} ${data.lastName}`.trim(),
  ];

  if (data.company) lines.push(`ORG:${data.company}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.phone) lines.push(`TEL;TYPE=WORK,VOICE:${data.phone}`);
  if (data.mobile) lines.push(`TEL;TYPE=CELL:${data.mobile}`);
  if (data.email) lines.push(`EMAIL;TYPE=WORK:${data.email}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.address || data.city || data.country) {
    lines.push(`ADR;TYPE=WORK:;;${data.address};${data.city};;;${data.country}`);
  }

  lines.push('END:VCARD');
  return lines.join('\n');
}

export function buildWhatsAppString(data: WhatsAppData): string {
  const phone = data.phone.replace(/[^0-9+]/g, '');
  const encoded = encodeURIComponent(data.message || '');
  return `https://wa.me/${phone}${encoded ? `?text=${encoded}` : ''}`;
}

export function buildURLString(data: URLData): string {
  let url = data.url.trim();
  if (url && !/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url;
}

export function buildTextString(data: TextData): string {
  return data.text;
}

export function buildEmailString(data: EmailData): string {
  const params: string[] = [];
  if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
  if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
  return `mailto:${data.to}${params.length ? `?${params.join('&')}` : ''}`;
}

export function buildPhoneString(data: PhoneData): string {
  const phone = data.phone.replace(/[^0-9+]/g, '');
  return `tel:${phone}`;
}

export function buildSMSString(data: SMSData): string {
  const phone = data.phone.replace(/[^0-9+]/g, '');
  return `smsto:${phone}${data.message ? `:${data.message}` : ''}`;
}

export function buildWiFiString(data: WiFiData): string {
  const esc = (s: string) => s.replace(/[\\;,"]/g, (c) => `\\${c}`);
  const hidden = data.hidden ? 'true' : 'false';
  return `WIFI:T:${data.security};S:${esc(data.ssid)};P:${esc(data.password)};H:${hidden};;`;
}
