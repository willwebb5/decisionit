import { Chewy } from 'next/font/google';

const chewy = Chewy({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-chewy',
});

export const metadata = {
  title: 'Decision Maker',
  description: 'Make decisions with fun tools like coin toss, dice rolls, and more',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={chewy.variable}>
        {children}
      </body>
    </html>
  );
}