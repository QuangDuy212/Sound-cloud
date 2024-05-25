
import AppHeader from '@/components/header/app.header';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppFooter from '@/components/footer/app.footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppHeader />
          {children}
          <AppFooter />
        </ThemeRegistry>
      </body>
    </html>
  );
}
