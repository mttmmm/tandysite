export const INSTAGRAM_URL = 'https://www.instagram.com/tandy.ink';
export const INSTAGRAM_HANDLE = '@tandy.ink';

export const WHATSAPP_NUMBER = '556195032547';
export const WHATSAPP_DISPLAY = '+55 61 9503-2547';

export const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
