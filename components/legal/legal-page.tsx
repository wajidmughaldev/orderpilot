import type { ReactNode } from 'react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

type LegalPageProps = {
  title: string;
  description: string;
  updatedAt?: string;
  children: ReactNode;
};

export function LegalPage({
  title,
  description,
  updatedAt = 'May 13, 2026',
  children,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-medium text-primary mb-3">OrderPilot legal</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg text-foreground/70 max-w-3xl">{description}</p>
            <p className="mt-4 text-sm text-foreground/50">Last updated: {updatedAt}</p>
          </div>

          <article className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm">
            <div className="space-y-8 text-foreground/75 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:tracking-tight [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2">
              {children}
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
