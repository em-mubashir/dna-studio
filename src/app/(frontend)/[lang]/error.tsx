'use client';

import { useParams } from 'next/navigation';
import { type Language } from '@/src/lib/utils/language';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const params = useParams();
  const lang = (params?.lang as Language) || 'en';

  const messages = {
    en: {
      title: 'Something went wrong!',
      button: 'Try again',
    },
    ar: {
      title: 'حدث خطأ ما!',
      button: 'حاول مرة أخرى',
    },
  };

  const content = messages[lang];

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{content.title}</h2>
      <button onClick={reset}>{content.button}</button>
    </div>
  );
}
