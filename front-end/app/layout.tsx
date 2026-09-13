import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import './globals.css';

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'black-purple';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}