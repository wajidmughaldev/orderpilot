'use client';

import Link from 'next/link';
import { Globe, Mail, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, LEGAL_OPERATOR_LINE } from '@/lib/business-info';

const productLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Team', href: '/#team' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center" aria-label="OrderPilot home">
              <img src="/logo.png" alt="OrderPilot" className="h-16 w-auto" />
            </Link>
            <p className="text-sm text-foreground/60">
              AI-powered WhatsApp ordering software for restaurants.
            </p>
            <p className="text-xs leading-5 text-foreground/65">{LEGAL_OPERATOR_LINE}</p>
            <div className="flex gap-4 pt-2">
              {['Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                <span
                  key={social}
                  className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-sm text-foreground/60 cursor-default"
                >
                  {social[0]}
                </span>
              ))}
            </div>
          </div>

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

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="text-foreground/60 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-foreground/60 hover:text-primary transition-colors">
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

        <div className="grid md:grid-cols-5 gap-6 py-8 border-t border-border/50">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">Business Contact</p>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-foreground font-medium hover:text-primary transition-colors break-words"
              >
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">Product Support</p>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-foreground font-medium hover:text-primary transition-colors break-words"
              >
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">WhatsApp Support</p>
              <p className="text-foreground font-medium">+923361815141</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">Website</p>
              <a
                href={BUSINESS_INFO.website}
                className="text-foreground font-medium hover:text-primary transition-colors"
              >
                {BUSINESS_INFO.productDomain}
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm text-foreground/60">Registered Address</p>
            <address className="not-italic text-sm leading-6 text-foreground/70">
              {BUSINESS_INFO.backerLegalName}
              <br />
              {BUSINESS_INFO.backerAddressLine1},
              <br />
              {BUSINESS_INFO.backerAddressLine2},
              <br />
              {BUSINESS_INFO.backerCountry}.
            </address>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>
              &copy; 2026 {BUSINESS_INFO.productName}. All rights reserved | Developed by{' '}
              <a href="https://100xlift.com" className="hover:text-primary transition-colors">
                100xlift.com
              </a>
            </p>
            <p className="text-xs text-foreground/50">
              Built by the OrderPilot team. Backed by{' '}
              <a
                href={BUSINESS_INFO.backerWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline"
              >
                {BUSINESS_INFO.backerName}
              </a>.
            </p>
          </div>
          <p>Built for Pakistani restaurants</p>
        </div>
      </div>
    </footer>
  );
}

