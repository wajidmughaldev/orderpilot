'use client';

import { MessageCircle, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="font-bold text-foreground">WhatsOrder</span>
            </div>
            <p className="text-sm text-foreground/60">
              The simplest way to take orders on WhatsApp for your restaurant.
            </p>
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
              {['About Us', 'Blog', 'Careers', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Compliance'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-border/50">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">WhatsApp Support</p>
              <p className="text-foreground font-medium">+92-300-1234567</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">Email</p>
              <p className="text-foreground font-medium">hello@whatsorder.pk</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/60">Phone</p>
              <p className="text-foreground font-medium">+92-21-9999999</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>&copy; 2024 WhatsOrder. All rights reserved.</p>
          <p>Made with ❤️ for Pakistani restaurants</p>
        </div>
      </div>
    </footer>
  );
}
