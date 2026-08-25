'use client';

import { BUSINESS_INFO } from '@/lib/business-info';
import { Linkedin } from 'lucide-react';

export function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/20 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/10 uppercase tracking-wide mb-3">
            Core Founders
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            The people building OrderPilot and its AI-powered restaurant ordering platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {BUSINESS_INFO.team.map((member) => (
            <div
              key={member.name}
              className="group relative rounded-2xl border border-border/60 bg-background p-6 text-center shadow-xs hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Initials Avatar Placeholder */}
                <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/10 group-hover:from-primary/30 group-hover:to-secondary/30 group-hover:scale-105 transition-all duration-300">
                  <span className="text-3xl font-bold text-primary/70 select-none">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-primary/95 mt-1">{member.role}</p>
                <p className="text-xs text-foreground/50 mt-0.5">{member.company}</p>

                {member.additionalRole && (
                  <div className="mt-3 inline-flex px-2.5 py-1 bg-foreground/5 text-foreground/70 rounded-md text-[11px] font-semibold">
                    {member.additionalRole}
                  </div>
                )}
              </div>

              {/* LinkedIn Link (Only renders if URL is provided in config) */}
              {member.linkedin ? (
                <div className="mt-6 pt-4 border-t border-border/50 flex justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-primary transition-colors font-medium"
                    aria-label={`${member.name} LinkedIn profile`}
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              ) : (
                // Keep UI layout consistent even without link
                <div className="mt-6 pt-4 border-t border-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
