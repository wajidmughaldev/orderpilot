'use client';

import { useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Globe, Mail, MapPin, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BUSINESS_INFO } from '@/lib/business-info';

type ContactFormValues = {
  name: string;
  email: string;
  restaurant: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  restaurant: '',
  message: '',
};

const fieldClassName =
  'h-11 border-foreground/30 bg-background focus-visible:border-primary focus-visible:ring-primary/20 aria-invalid:border-destructive';

const textareaClassName =
  'min-h-32 border-foreground/30 bg-background focus-visible:border-primary focus-visible:ring-primary/20 aria-invalid:border-destructive';

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isSubmitting = status === 'submitting';

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Client-side validation
    const validationErrors: ContactFormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.name.trim().length < 2) {
      validationErrors.name = 'Enter your name (at least 2 characters).';
    }
    if (!emailPattern.test(values.email.trim())) {
      validationErrors.email = 'Enter a valid email address.';
    }
    if (values.restaurant.trim().length < 2) {
      validationErrors.restaurant = 'Enter your restaurant or company name.';
    }
    if (values.message.trim().length < 10) {
      validationErrors.message = 'Enter a message of at least 10 characters.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setStatusMessage('Please fix the highlighted fields before sending.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: ContactFormErrors;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus('error');
        setStatusMessage(result.message ?? 'Your message could not be sent. Please try again.');
        return;
      }

      setValues(initialValues);
      setErrors({});
      setStatus('success');
      setStatusMessage('Thank you. Your message has been sent successfully.');
    } catch {
      setStatus('error');
      setStatusMessage('Message could not be sent. Please check your network connection and try again.');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact details */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/10 uppercase tracking-wide mb-4">
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Contact OrderPilot
              </h2>
              <p className="text-lg text-foreground/60 leading-relaxed">
                Interested in OrderPilot, partnerships, restaurant onboarding, or learning more about the company? We&apos;d be happy to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">General Enquiries</h4>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-foreground/75 hover:text-primary transition-colors text-sm break-all font-medium mt-0.5 inline-block"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Website</h4>
                  <a
                    href={BUSINESS_INFO.website}
                    className="text-foreground/75 hover:text-primary transition-colors text-sm font-medium mt-0.5 inline-block"
                  >
                    {BUSINESS_INFO.productDomain}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Operating Location</h4>
                  <p className="text-foreground/75 text-sm font-medium mt-0.5">
                    {BUSINESS_INFO.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-6 md:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-foreground mb-5">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {statusMessage && (
                <Alert
                  variant={status === 'error' ? 'destructive' : 'default'}
                  className={status === 'success' ? 'border-primary/30 bg-primary/5 text-foreground' : undefined}
                >
                  {status === 'success' ? <CheckCircle2 className="text-primary" /> : <AlertCircle />}
                  <AlertTitle>{status === 'success' ? 'Success' : 'Check your inputs'}</AlertTitle>
                  <AlertDescription>{statusMessage}</AlertDescription>
                </Alert>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Full Name" htmlFor="name" error={errors.name}>
                  <Input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    className={fieldClassName}
                    required
                  />
                </FormField>

                <FormField label="Work Email" htmlFor="email" error={errors.email}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className={fieldClassName}
                    required
                  />
                </FormField>
              </div>

              <FormField label="Restaurant / Company Name" htmlFor="restaurant" error={errors.restaurant}>
                <Input
                  id="restaurant"
                  name="restaurant"
                  value={values.restaurant}
                  onChange={(event) => updateField('restaurant', event.target.value)}
                  placeholder="Your restaurant name"
                  autoComplete="organization"
                  aria-invalid={Boolean(errors.restaurant)}
                  className={fieldClassName}
                  required
                />
              </FormField>

              <FormField label="How can we help you?" htmlFor="message" error={errors.message}>
                <Textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder="Describe your request, onboarding questions, or business inquiry here..."
                  aria-invalid={Boolean(errors.message)}
                  className={textareaClassName}
                  required
                />
              </FormField>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-12 w-full bg-primary hover:bg-primary/90 text-white sm:w-auto"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="h-4 w-4 ml-2" />
              </Button>

              {hasErrors && (
                <p className="text-sm text-destructive font-medium">
                  Please fix the validation errors and try sending again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  children,
  error,
  htmlFor,
  label,
}: {
  error?: string;
  htmlFor: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}
