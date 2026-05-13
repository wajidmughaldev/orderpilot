'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Clock, Users, TrendingDown } from 'lucide-react';

const problems = [
  {
    icon: AlertCircle,
    title: 'Lost Orders',
    description: 'Customers call, text multiple platforms, and orders get missed or forgotten.',
  },
  {
    icon: Clock,
    title: 'Manual Processing',
    description: 'Your staff manually logs orders, leading to mistakes and wasted time.',
  },
  {
    icon: Users,
    title: 'No Order History',
    description: 'Customers have no way to track orders or view their history.',
  },
  {
    icon: TrendingDown,
    title: 'Low Retention',
    description: 'Without easy ordering, customers switch to competitors.',
  },
];

export function Problem() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Restaurant Ordering is Broken
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Most restaurants still rely on phone calls and scattered messaging apps. It&apos;s slow, error-prone, and costs you revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <Card key={idx} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-destructive/10 w-fit rounded-lg">
                    <Icon className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{problem.title}</h3>
                  <p className="text-sm text-foreground/60">{problem.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
