import { Metadata } from 'next';
import { SAMPLE_BOOKS } from '@/lib/sample-data';

export function generateStaticParams() {
  return SAMPLE_BOOKS.map((book) => ({
    id: book.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const book = SAMPLE_BOOKS.find(b => b.id === params.id);
  
  if (!book) {
    return {
      title: 'ページが見つかりません | なぜなぜ絵本メーカー',
      description: 'お探しの絵本は見つかりませんでした。',
    };
  }

  return {
    title: `${book.title} | なぜなぜ絵本メーカー`,
    description: book.description,
    openGraph: {
      title: `${book.title} | なぜなぜ絵本メーカー`,
      description: book.description,
      images: [{ url: book.coverImage }],
    },
  };
}

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}