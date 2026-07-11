import { motion, useReducedMotion } from 'framer-motion';

const WHATSAPP_NUMBER = '919968240372';
const WHATSAPP_MESSAGE = "Hi Infimind, I'd like to know more about your programs.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** The official WhatsApp glyph, inline so no external icon/image request is needed. */
function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16.02 3C9.4 3 4 8.37 4 15c0 2.36.68 4.56 1.86 6.42L4 29l7.76-1.83A11.9 11.9 0 0 0 16.02 27C22.65 27 28 21.63 28 15S22.65 3 16.02 3Zm0 21.7c-2 0-3.87-.57-5.45-1.55l-.39-.23-4.6 1.09 1.13-4.48-.25-.4A9.63 9.63 0 0 1 5.9 15c0-5.6 4.55-10.15 10.12-10.15S26.15 9.4 26.15 15 21.6 24.7 16.02 24.7Zm5.55-7.6c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.79-.73 2.04-1.44.25-.7.25-1.31.18-1.44-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Infimind on WhatsApp"
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-hover transition-shadow hover:shadow-[0_18px_48px_rgba(37,211,102,0.35)]"
    >
      <WhatsAppIcon />
    </motion.a>
  );
}

export { WHATSAPP_URL };
