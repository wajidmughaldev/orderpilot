import type { Metadata } from 'next';
import { BookDemoPage } from '@/components/book-demo/book-demo-page';

export const metadata: Metadata = {
  title: 'Book a Demo - OrderPilot',
  description:
    'Book an OrderPilot demo for WhatsApp ordering at your restaurant.',
};

export default function Page() {
  return <BookDemoPage />;
}
