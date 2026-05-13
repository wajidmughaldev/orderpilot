'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Pizza,
  Utensils,
  Coffee,
  Cake,
  UtensilsCrossed,
  Flame,
  Salad,
  Droplet,
} from 'lucide-react';

const restaurants = [
  { icon: Pizza, name: 'Fast Food' },
  { icon: Utensils, name: 'Restaurants' },
  { icon: Coffee, name: 'Cafes & Bakeries' },
  { icon: Cake, name: 'Desserts & Sweets' },
  { icon: UtensilsCrossed, name: 'Fine Dining' },
  { icon: Flame, name: 'BBQ & Grills' },
  { icon: Salad, name: 'Healthy Food' },
  { icon: Droplet, name: 'Beverages' },
];

export function RestaurantTypes() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Perfect for All Restaurant Types
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            From quick bites to fine dining, WhatsOrder works for every business model.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {restaurants.map((restaurant, idx) => {
            const Icon = restaurant.icon;
            return (
              <Card
                key={idx}
                className="border-border/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all cursor-pointer group"
              >
                <CardContent className="py-8 flex flex-col items-center text-center gap-3">
                  <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="font-medium text-foreground">{restaurant.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
