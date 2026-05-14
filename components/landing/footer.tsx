'use client';

import Link from 'next/link';
import { MessageCircle, Mail, Phone } from 'lucide-react';

const productLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: 'mailto:hello@orderpilot.pk' },
];

export function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center" aria-label="OrderPilot home">
              <img src="/logo.png" alt="OrderPilot" className="h-16 w-auto" />
            </Link>
            <p className="text-sm text-foreground/60">
              The simplest way to take orders on WhatsApp for your restaurant.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy-policy" className="text-foreground/60 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-foreground/60 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/data-deletion" className="text-foreground/60 hover:text-primary transition-colors">
                  Data Deletion
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="text-foreground/60 hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-border/50">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">WhatsApp Support</p>
              <p className="text-foreground font-medium">+923361815141</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">Email</p>
              <p className="text-foreground font-medium">orderpilot@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">Phone</p>
              <p className="text-foreground font-medium">+923361815141</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>
            &copy; 2026 OrderPilot. All rights reserved | Developed by{' '}
            <a href="https://100xlift.com" className="hover:text-primary transition-colors">
              100xlift.com
            </a>
          </p>
          <p>Built for Pakistani restaurants</p>
        </div>
      </div>
    </footer>
  );
}
