export type QRType = 'vcard' | 'whatsapp';

export type CornerStyle = 'square' | 'rounded' | 'dots';
export type DotStyle = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';

export interface VCardData {
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  address: string;
  city: string;
  country: string;
}

export interface WhatsAppData {
  phone: string;
  message: string;
}

export interface QRStyle {
  foreground: string;
  background: string;
  cornerColor: string;
  cornerStyle: CornerStyle;
  dotStyle: DotStyle;
  logoUrl: string | null;
  logoSize: number;
  scanText: string;
  scanTextColor: string;
  showScanArrow: boolean;
}
