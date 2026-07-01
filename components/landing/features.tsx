'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  LayoutDashboard,
  MessageCircle,
  Timer,
  FolderTree,
  FileText,
  Activity,
  Users,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'WhatsApp First',
    description: 'Your customers order directly via WhatsApp. No app downloads, no friction.',
  },
  {
    icon: Timer,
    title: '90 Sec Avg Order',
    description: 'Lightning fast ordering. Customers complete orders in under 90 seconds.',
  },
  {
    icon: LayoutDashboard,
    title: 'Catalog Dashboard',
    description: 'Create and manage your entire catalog from an intuitive dashboard.',
  },
  {
    icon: FolderTree,
    title: 'Products & Categories',
    description: 'Organize items with custom categories. Easy product listing and management.',
  },
  {
    icon: FileText,
    title: 'Message Templates',
    description: 'Create reusable templates for greetings, confirmations, and promotions.',
  },
  {
    icon: Activity,
    title: 'Real-time Status',
    description: 'Live order tracking. Customers and staff see updates instantly.',
  },
  {
    icon: Users,
    title: 'Multi-Branch Support',
    description: 'Manage multiple restaurant locations from a single dashboard.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Protected restaurant, order, and WhatsApp data with practical access controls.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Everything you need to run a modern, efficient restaurant.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground/60">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Tagline */}
        <div className="mt-12 text-center">
          <p className="text-foreground/50 text-sm">
            And many more features to help you grow your business.{' '}
            <a href="#roadmap" className="text-primary hover:underline font-medium">
              See what&apos;s coming next
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
