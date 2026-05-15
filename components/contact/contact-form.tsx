'use client';

import { useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  restaurant: string;
  restaurantType: string;
  city: string;
  branches: string;
  monthlyOrders: string;
  currentChannels: string;
  preferredDemoTime: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  restaurant: '',
  restaurantType: '',
  city: '',
  branches: '',
  monthlyOrders: '',
  currentChannels: '',
  preferredDemoTime: '',
  message: '',
};

const fieldClassName =
  'h-11 border-foreground/30 bg-background focus-visible:border-primary focus-visible:ring-primary/20 aria-invalid:border-destructive';

const selectClassName =
  'h-11 w-full rounded-md border border-foreground/30 bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20 aria-invalid:border-destructive';

const textareaClassName =
  'min-h-36 border-foreground/30 bg-background focus-visible:border-primary focus-visible:ring-primary/20 aria-invalid:border-destructive';

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isSubmitting = status === 'submitting';

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const updateField = (field: keyof FormValues, value: string) => {
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

    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setStatusMessage('Please fix the highlighted fields before booking your demo.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: FormErrors;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus('error');
        setStatusMessage(result.message ?? 'Demo request could not be sent. Please try again.');
        return;
      }

      setValues(initialValues);
      setErrors({});
      setStatus('success');
      setStatusMessage('Thanks. Your demo request has been sent to the OrderPilot team.');
    } catch {
      setStatus('error');
      setStatusMessage('Demo request could not be sent. Please check your connection and try again.');
    }
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm md:p-8">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {statusMessage && (
          <Alert
            variant={status === 'error' ? 'destructive' : 'default'}
            className={status === 'success' ? 'border-primary/30 bg-primary/5 text-foreground' : undefined}
          >
            {status === 'success' ? <CheckCircle2 /> : <AlertCircle />}
            <AlertTitle>{status === 'success' ? 'Demo request sent' : 'Check your details'}</AlertTitle>
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

          <FormField label="WhatsApp / Phone" htmlFor="phone" error={errors.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder="+92..."
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              className={fieldClassName}
              required
            />
          </FormField>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
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

          <FormField label="Restaurant Name" htmlFor="restaurant" error={errors.restaurant}>
            <Input
              id="restaurant"
              name="restaurant"
              value={values.restaurant}
              onChange={(event) => updateField('restaurant', event.target.value)}
              placeholder="Restaurant name"
              autoComplete="organization"
              aria-invalid={Boolean(errors.restaurant)}
              className={fieldClassName}
              required
            />
          </FormField>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Restaurant Type" htmlFor="restaurantType" error={errors.restaurantType}>
            <select
              id="restaurantType"
              name="restaurantType"
              value={values.restaurantType}
              onChange={(event) => updateField('restaurantType', event.target.value)}
              aria-invalid={Boolean(errors.restaurantType)}
              className={selectClassName}
              required
            >
              <option value="">Select type</option>
              <option value="Quick Service Restaurant">Quick Service Restaurant</option>
              <option value="Cafe / Bakery">Cafe / Bakery</option>
              <option value="Cloud Kitchen">Cloud Kitchen</option>
              <option value="Fine Dining">Fine Dining</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Other">Other</option>
            </select>
          </FormField>

          <FormField label="City / Area" htmlFor="city" error={errors.city}>
            <Input
              id="city"
              name="city"
              value={values.city}
              onChange={(event) => updateField('city', event.target.value)}
              placeholder="Lahore, Gulberg"
              autoComplete="address-level2"
              aria-invalid={Boolean(errors.city)}
              className={fieldClassName}
              required
            />
          </FormField>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Number of Branches" htmlFor="branches" error={errors.branches}>
            <select
              id="branches"
              name="branches"
              value={values.branches}
              onChange={(event) => updateField('branches', event.target.value)}
              aria-invalid={Boolean(errors.branches)}
              className={selectClassName}
              required
            >
              <option value="">Select branches</option>
              <option value="1 branch">1 branch</option>
              <option value="2-3 branches">2-3 branches</option>
              <option value="4-10 branches">4-10 branches</option>
              <option value="10+ branches">10+ branches</option>
            </select>
          </FormField>

          <FormField label="Monthly WhatsApp Orders" htmlFor="monthlyOrders" error={errors.monthlyOrders}>
            <select
              id="monthlyOrders"
              name="monthlyOrders"
              value={values.monthlyOrders}
              onChange={(event) => updateField('monthlyOrders', event.target.value)}
              aria-invalid={Boolean(errors.monthlyOrders)}
              className={selectClassName}
              required
            >
              <option value="">Select order volume</option>
              <option value="Under 100 orders">Under 100 orders</option>
              <option value="100-500 orders">100-500 orders</option>
              <option value="500-1,500 orders">500-1,500 orders</option>
              <option value="1,500+ orders">1,500+ orders</option>
            </select>
          </FormField>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Current Ordering Channels" htmlFor="currentChannels" error={errors.currentChannels}>
            <Input
              id="currentChannels"
              name="currentChannels"
              value={values.currentChannels}
              onChange={(event) => updateField('currentChannels', event.target.value)}
              placeholder="WhatsApp, phone, Foodpanda"
              aria-invalid={Boolean(errors.currentChannels)}
              className={fieldClassName}
              required
            />
          </FormField>

          <FormField label="Preferred Demo Time" htmlFor="preferredDemoTime" error={errors.preferredDemoTime}>
            <Input
              id="preferredDemoTime"
              name="preferredDemoTime"
              value={values.preferredDemoTime}
              onChange={(event) => updateField('preferredDemoTime', event.target.value)}
              placeholder="Tomorrow after 3 PM"
              aria-invalid={Boolean(errors.preferredDemoTime)}
              className={fieldClassName}
              required
            />
          </FormField>
        </div>

        <FormField label="What should we focus on in the demo?" htmlFor="message" error={errors.message}>
          <Textarea
            id="message"
            name="message"
            value={values.message}
            onChange={(event) => updateField('message', event.target.value)}
            placeholder="Example: WhatsApp menu setup, order dashboard, staff workflow, or reducing manual order-taking."
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
          {isSubmitting ? 'Booking...' : 'Book Demo'}
          <Send className="h-4 w-4" />
        </Button>

        {hasErrors && (
          <p className="text-sm text-destructive">
            Review the fields above and submit again.
          </p>
        )}
      </form>
    </div>
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
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const phonePattern = /^[+()\-\s0-9]{8,20}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (values.name.trim().length < 2) {
    errors.name = 'Enter your full name.';
  }

  if (!phonePattern.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.restaurant.trim().length < 2) {
    errors.restaurant = 'Enter your restaurant name.';
  }

  if (!values.restaurantType) {
    errors.restaurantType = 'Select your restaurant type.';
  }

  if (values.city.trim().length < 2) {
    errors.city = 'Enter your city or area.';
  }

  if (!values.branches) {
    errors.branches = 'Select your branch count.';
  }

  if (!values.monthlyOrders) {
    errors.monthlyOrders = 'Select your monthly order volume.';
  }

  if (values.currentChannels.trim().length < 2) {
    errors.currentChannels = 'Enter at least one current ordering channel.';
  }

  if (values.preferredDemoTime.trim().length < 4) {
    errors.preferredDemoTime = 'Enter a preferred demo time.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Enter at least 10 characters.';
  }

  return errors;
}
