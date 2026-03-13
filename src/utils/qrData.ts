import type { VCardData, WhatsAppData } from '../types';

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
