export type QRType = 'vcard' | 'whatsapp' | 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi';

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

export interface URLData {
  url: string;
}

export interface TextData {
  text: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface PhoneData {
  phone: string;
}

export interface SMSData {
  phone: string;
  message: string;
}

export interface WiFiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
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
