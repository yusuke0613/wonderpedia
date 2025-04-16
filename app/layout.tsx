import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wonderpedia',
  description: 'お子様だけの特別なおはなしを作ろう',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}