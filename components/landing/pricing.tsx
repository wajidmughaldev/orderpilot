'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, X, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const plans = [
  {
    name: 'Basic',
    monthlyPrice: 4999,
    annualPrice: 49990,
    extraOrderCost: 20,
    description: 'Perfect for small restaurants just getting started',
    features: [
      { name: 'Monthly Orders Limit', value: '300', tooltip: 'Number of orders you can process per month' },
      { name: 'WhatsApp Bot', value: true, tooltip: 'Automated replies and order taking via WhatsApp' },
      { name: 'Catalog & Product Uploading', value: true, tooltip: 'Upload your menu items with images and descriptions' },
      { name: 'Restaurant Dashboard', value: 'Basic', tooltip: 'View orders, manage menu, and track sales' },
      { name: 'Number of Branches', value: '1', tooltip: 'Number of restaurant locations you can manage' },
      { name: 'Menu Items', value: '50', tooltip: 'Maximum number of products you can list' },
      { name: 'Real-time Notifications', value: true, tooltip: 'Sound alerts for new orders' },
      { name: 'Support (Chat/Phone)', value: true, tooltip: '24/7 customer support via chat and phone' },
      { name: 'Dedicated Account Manager', value: false, tooltip: 'Personal manager for your account' },
      { name: 'Chatbot Customization', value: 'Basic', tooltip: 'Text-based automated responses' },
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    monthlyPrice: 12999,
    annualPrice: 129990,
    extraOrderCost: 16,
    description: 'For growing restaurants with multiple branches',
    features: [
      { name: 'Monthly Orders Limit', value: '1,000', tooltip: 'Number of orders you can process per month' },
      { name: 'WhatsApp Bot', value: true, tooltip: 'Automated replies and order taking via WhatsApp' },
      { name: 'Catalog & Product Uploading', value: true, tooltip: 'Upload your menu items with images and descriptions' },
      { name: 'Restaurant Dashboard', value: 'Full + Reports', tooltip: 'Complete dashboard with detailed sales reports' },
      { name: 'Number of Branches', value: '3', tooltip: 'Number of restaurant locations you can manage' },
      { name: 'Menu Items', value: '200', tooltip: 'Maximum number of products you can list' },
      { name: 'Real-time Notifications', value: true, tooltip: 'Sound alerts for new orders' },
      { name: 'Support (Chat/Phone)', value: true, tooltip: 'Priority 24/7 customer support' },
      { name: 'Dedicated Account Manager', value: false, tooltip: 'Personal manager for your account' },
      { name: 'Chatbot Customization', value: 'Advanced', tooltip: 'Images + text based responses' },
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Business',
    monthlyPrice: 29999,
    annualPrice: 299990,
    extraOrderCost: 12,
    description: 'For large chains and enterprise restaurants',
    features: [
      { name: 'Monthly Orders Limit', value: '5,000', tooltip: 'Number of orders you can process per month' },
      { name: 'WhatsApp Bot', value: true, tooltip: 'Automated replies and order taking via WhatsApp' },
      { name: 'Catalog & Product Uploading', value: true, tooltip: 'Upload your menu items with images and descriptions' },
      { name: 'Restaurant Dashboard', value: 'Full + Analytics', tooltip: 'Complete dashboard with advanced analytics and insights' },
      { name: 'Number of Branches', value: '10', tooltip: 'Number of restaurant locations you can manage' },
      { name: 'Menu Items', value: '1,000', tooltip: 'Maximum number of products you can list' },
      { name: 'Real-time Notifications', value: true, tooltip: 'Sound alerts for new orders' },
      { name: 'Support (Chat/Phone)', value: true, tooltip: 'VIP 24/7 customer support' },
      { name: 'Dedicated Account Manager', value: true, tooltip: 'Personal manager dedicated to your account' },
      { name: 'Chatbot Customization', value: 'Full', tooltip: 'Complete catalogue setup with custom flows' },
    ],
    cta: 'Get Started',
    highlighted: false,
  },
];

function formatPrice(price: number): string {
  return price.toLocaleString('en-PK');
}

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <TooltipProvider>
      <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-8">
              Choose the plan that fits your restaurant. Scale as you grow.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-foreground/50'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  isAnnual ? 'bg-primary' : 'bg-foreground/20'
                }`}
                aria-label={isAnnual ? 'Switch to monthly billing' : 'Switch to annual billing'}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                    isAnnual ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-foreground/50'}`}>
                Annual
              </span>
              <span className={`bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full transition-opacity ${isAnnual ? 'opacity-100' : 'opacity-50'}`}>
                2 Months Free
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative transition-all ${
                  plan.highlighted
                    ? 'border-primary shadow-xl md:scale-105 bg-gradient-to-b from-primary/5 to-transparent'
                    : 'border-border/50 hover:border-primary/30 hover:shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-foreground/60 mt-1">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-foreground/60">PKR</span>
                      <span className="text-4xl font-bold text-foreground">
                        {formatPrice(isAnnual ? plan.annualPrice : plan.monthlyPrice)}
                      </span>
                    </div>
                    <span className="text-foreground/60 text-sm">
                      {isAnnual ? '/year' : '/month'}
                    </span>
                    {isAnnual && (
                      <p className="text-xs text-primary mt-1">
                        Save PKR {formatPrice((plan.monthlyPrice * 12) - plan.annualPrice)}
                      </p>
                    )}
                  </div>

                  {/* Extra Order Cost */}
                  <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                    <span className="text-xs text-foreground/60">Extra order:</span>
                    <span className="text-sm font-semibold text-foreground">PKR {plan.extraOrderCost}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3.5 h-3.5 text-foreground/40 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Cost per order after exceeding monthly limit</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-primary hover:bg-primary/90'
                        : 'bg-foreground/10 hover:bg-foreground/20 text-foreground'
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  {/* Features */}
                  <div className="space-y-3 pt-2">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {feature.value === false ? (
                          <X className="w-5 h-5 text-foreground/30 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 flex items-center gap-2">
                          <span className={`text-sm ${feature.value === false ? 'text-foreground/40' : 'text-foreground/80'}`}>
                            {feature.name}
                            {typeof feature.value === 'string' && (
                              <span className="font-semibold text-foreground ml-1">
                                ({feature.value})
                              </span>
                            )}
                          </span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-3.5 h-3.5 text-foreground/30 cursor-help flex-shrink-0" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[200px]">
                              <p className="text-xs">{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Note */}
          <p className="text-center text-sm text-foreground/50 mt-10 max-w-xl mx-auto">
            All plans include a 14-day free trial. No credit card required. 
            Need a custom plan? <a href="#contact" className="text-primary hover:underline">Contact us</a>
          </p>
        </div>
      </section>
    </TooltipProvider>
  );
}
