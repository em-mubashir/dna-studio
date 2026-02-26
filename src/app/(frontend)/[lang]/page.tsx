import { type Language } from '@/src/lib/utils/language';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  return (
    <div>
      <h1>Homepage - {lang.toUpperCase()}</h1>
      <p>Language: {lang}</p>
    </div>
  );
}
