'use client';

import { MessageCircle, Mail, Phone } from 'lucide-react';
import { BUSINESS_INFO, LEGAL_OPERATOR_LINE } from '@/lib/business-info';

export function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">O</span>
              </div>
              <span className="font-bold text-foreground">OrderPilot</span>
            </div>
            <p className="text-sm text-foreground/60">
              The simplest way to take orders on WhatsApp for your restaurant.
            </p>
            <p className="text-xs leading-5 text-foreground/60">{LEGAL_OPERATOR_LINE}</p>
            <div className="flex gap-4 pt-2">
              {['Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full bg-foreground/10 hover:bg-primary hover:text-white flex items-center justify-center text-sm transition-colors"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm">
              {['Features', 'Pricing', 'Dashboard', 'Security'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Blog', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Contact', href: `mailto:${BUSINESS_INFO.email}` },
              ].map((link) => (
                <li key={link.label}>
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
        <div className="grid md:grid-cols-4 gap-6 py-8 border-t border-border/50">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">WhatsApp Support</p>
              <p className="text-foreground font-medium">+92-300-1234567</p>
              <p className="text-xs text-foreground/50">{BUSINESS_INFO.legalName}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">Email</p>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-foreground font-medium hover:text-primary transition-colors break-words"
              >
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">Phone</p>
              <p className="text-foreground font-medium">+92-21-9999999</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-foreground/60">Registered Address</p>
            <address className="not-italic text-sm leading-6 text-foreground/70">
              {BUSINESS_INFO.legalName}
              <br />
              {BUSINESS_INFO.registeredAddressLine1},
              <br />
              {BUSINESS_INFO.registeredAddressLine2},
              <br />
              {BUSINESS_INFO.registeredCountry}.
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>&copy; 2026 {BUSINESS_INFO.productName}. All rights reserved.</p>
          <p>Built for restaurants in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
