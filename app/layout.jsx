export const metadata = {
  title: 'ApniDukaan',
  description: 'Ecommerce demo website'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
