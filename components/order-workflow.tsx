'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  channels, ico, leftPanel,
  type WorkflowChannel,
} from './workflow-renderer';

const ORDER_CHANNELS: WorkflowChannel[] = ['whatsapp', 'web', 'qr'];

const STEP_DATA = [
  {
    number: '01',
    title: 'Customer orders.',
    text: 'On WhatsApp, your website, or from table QR.',
    extraClass: 'step-first',
  },
  {
    number: '02',
    title: 'The order is checked.',
    text: 'Items, quantities and payment are confirmed before cooking begins.',
    extraClass: 'step-second',
  },
  {
    number: '03',
    title: 'Your team sees it.',
    text: 'It lands on the kitchen board, clearly readable without paper chits.',
    extraClass: 'step-third',
  },
  {
    number: '04',
    title: 'Mark it as it moves.',
    text: 'New, preparing, ready — so the whole team stays in sync.',
    extraClass: 'step-fourth',
  },
];

export default function OrderWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(containerRef, { margin: '0px' });

  const [channel, setChannel] = useState<WorkflowChannel>('whatsapp');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTabHidden, setIsTabHidden] = useState<boolean>(false);

  // Sub-step timer state (e.g. for typing dots vs chat bubble in step 01, cycle in step 04)
  const [stepTick, setStepTick] = useState<number>(0);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // 3-second auto-play timer for steps
  useEffect(() => {
    if (prefersReduced || isPaused || !isInView || isTabHidden) return;

    setStepTick(0);
    const tickInterval = setInterval(() => {
      setStepTick((t) => t + 1);
    }, 1000);

    const stepTimer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(tickInterval);
    };
  }, [activeStep, isPaused, isInView, isTabHidden, prefersReduced]);

  function handleTabClick(ch: WorkflowChannel) {
    setChannel(ch);
    setIsPaused(true);
  }

  function handleStepClick(index: number) {
    setActiveStep(index);
    setIsPaused(true);
  }

  function onTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? ORDER_CHANNELS.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : ORDER_CHANNELS.length - 1)) % ORDER_CHANNELS.length;
    setChannel(ORDER_CHANNELS[next]);
    setIsPaused(true);
    document.getElementById(`tab-${ORDER_CHANNELS[next]}`)?.focus();
  }

  return (
    <div ref={containerRef} className="page-container">
      <motion.header
        initial={prefersReduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px', amount: 0.05 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="section-heading-centered mb-12"
      >
        <p className="eyebrow section-heading-eyebrow">HOW IT WORKS</p>
        <h2 className="section-title">From order to kitchen, in four steps.</h2>
        <p className="section-description mt-4">Customers order the way they already do. Your team sees it all in one place.</p>
      </motion.header>

      <motion.section
        initial={prefersReduced ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px', amount: 0.05 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        className="workflow-shell"
        aria-label="OrderPilot ordering steps"
        data-current-channel={channel}
      >
        {/* Channel Tab Bar */}
        <div className="channel-tabbar" role="tablist" aria-label="Ordering channel">
          {ORDER_CHANNELS.map((item, i) => (
            <button
              key={item}
              className={`channel-tab${channel === item ? ' active' : ''}`}
              id={`tab-${item}`}
              type="button"
              role="tab"
              aria-selected={channel === item}
              aria-controls="workflow-panels"
              tabIndex={channel === item ? 0 : -1}
              onClick={() => handleTabClick(item)}
              onKeyDown={(event) => onTabKeyDown(event, i)}
            >
              <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: ico(channels[item].icon, '', 22) }} />
              <span>{channels[item].tab}</span>
            </button>
          ))}
        </div>

        {/* Workflow Main Panel */}
        <div
          id="workflow-panels"
          className="workflow-main"
          role="tabpanel"
          aria-labelledby={`tab-${channel}`}
          tabIndex={0}
        >
          {/* Left illustration panel */}
          <div className="showcase" dangerouslySetInnerHTML={{ __html: leftPanel(channel) }} />

          {/* Right steps journey */}
          <div className="journey">
            <div className="journey-heading">
              <span className="eyebrow">WHAT HAPPENS NEXT</span>
              <h2>The same four steps, whichever way they order.</h2>
            </div>

            <div className="steps-wrap relative">
              <svg aria-hidden="true" className="connector-track" viewBox="0 0 792 552" preserveAspectRatio="none">
                <path d="M761 135 H777 Q789 135 789 148 V270 Q789 280 779 280 H292 Q282 280 282 293" stroke="#b8e3d4" strokeWidth="1.6" strokeDasharray="5 5" strokeLinecap="round" fill="none" />
              </svg>
              <span aria-hidden="true" className="connector-arrow arrow-top" dangerouslySetInnerHTML={{ __html: ico('arrowThin', '', 32) }} />
              <span aria-hidden="true" className="connector-arrow arrow-bottom" dangerouslySetInnerHTML={{ __html: ico('arrowThin', '', 32) }} />

              <div className="steps-grid">
                {STEP_DATA.map((step, index) => {
                  const isActive = activeStep === index;
                  return (
                    <article
                      key={step.number}
                      onClick={() => handleStepClick(index)}
                      className={`step-card ${step.extraClass} cursor-pointer relative overflow-hidden transition-all ${
                        isActive ? 'ring-2 ring-brand/30 shadow-md' : 'opacity-85 hover:opacity-100'
                      }`}
                      style={{ transform: isActive ? 'translateY(-2px)' : 'none' }}
                    >
                      {/* 3s Progress Bar */}
                      {isActive && !isPaused && !prefersReduced && (
                        <motion.div
                          key={`progress-${activeStep}`}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 3, ease: 'linear' }}
                          className="absolute top-0 left-0 h-1 bg-brand z-10"
                        />
                      )}

                      <span className="step-number">{step.number}</span>

                      {/* Step Illustration with specific animation per requirement */}
                      <div className="step-illustration">
                        {index === 0 && (
                          <Step1Illustration channel={channel} isActive={isActive} stepTick={stepTick} />
                        )}
                        {index === 1 && (
                          <Step2Illustration channel={channel} isActive={isActive} />
                        )}
                        {index === 2 && (
                          <Step3Illustration channel={channel} isActive={isActive} />
                        )}
                        {index === 3 && (
                          <Step4Illustration isActive={isActive} stepTick={stepTick} />
                        )}
                      </div>

                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 border-t border-forest/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 dark:border-white/10">
              <p className="text-sm font-semibold text-ink/75 dark:text-white/75">
                Want to see the kitchen board in action?
              </p>
              <a
                href="#product"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline dark:text-leaf"
              >
                Explore the kitchen board up close <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

// Step 01: typing dots, then the chat bubble
function Step1Illustration({
  channel,
  isActive,
  stepTick,
}: {
  channel: WorkflowChannel;
  isActive: boolean;
  stepTick: number;
}) {
  const prefersReduced = useReducedMotion();

  if (channel === 'whatsapp') {
    const showTyping = isActive && stepTick < 1 && !prefersReduced;
    return (
      <div className="mini-whatsapp">
        <span className="mini-person" dangerouslySetInnerHTML={{ __html: ico('user', '', 24) }} />
        {showTyping ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mini-bubble flex items-center justify-center min-h-[50px] gap-1 px-4 py-3"
          >
            <motion.span animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.6 }} className="size-1.5 rounded-full bg-slate-400" />
            <motion.span animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} className="size-1.5 rounded-full bg-slate-400" />
            <motion.span animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} className="size-1.5 rounded-full bg-slate-400" />
          </motion.div>
        ) : (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mini-bubble"
          >
            <b>1 Zinger Burger<br />+ Fries</b>
            <small>9:41 AM <span>✓✓</span></small>
          </motion.div>
        )}
        <span className="mini-spark">〃</span>
      </div>
    );
  }

  if (channel === 'web') {
    return (
      <div className="mini-storefront">
        <div className="mini-browser-bar">‹ &nbsp; ▣ &nbsp; orderpilot.pk &nbsp; ↻</div>
        <div className="mini-store-menu"><span>Burgers</span> Sides &nbsp; Drinks</div>
        <div className="mini-store-product">
          <img src="/orderpilot-workflow/burger.webp" alt="" />
          <div>
            <b>Zinger Burger + Fries</b>
            <small>Rs. 850</small>
            <em>Add to cart</em>
          </div>
        </div>
      </div>
    );
  }

  // QR
  return (
    <div className="mini-qr-order">
      <div className="mini-qr-sign qr-table-sign">
        <strong>Scan to Order</strong>
        <small>Table 12</small>
        <img src="/orderpilot-workflow/sample-qr.svg" alt="" />
      </div>
      <div className="mini-qr-phone">
        <span className="mini-notch" />
        <img src="/orderpilot-workflow/burger.webp" alt="" />
        <b>Zinger Burger + Fries</b>
        <span className="quantity"><span>-</span><b>1</b><span>+</span></span>
        <em>Add to order</em>
      </div>
    </div>
  );
}

// Step 02: check mark pops in
function Step2Illustration({
  channel,
  isActive,
}: {
  channel: WorkflowChannel;
  isActive: boolean;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="mini-check-row">
      <div className="mini-checked-product">
        <img src="/orderpilot-workflow/burger.webp" alt="" />
        <div>
          <b>Zinger Burger + Fries</b>
          <small>Rs. 850 {channel === 'qr' ? '· Table 12' : ''}</small>
          <span className="quantity"><span>-</span><b>1</b><span>+</span></span>
        </div>
      </div>
      <motion.span
        initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
        animate={isActive && !prefersReduced ? { scale: [0, 1.25, 1], opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="round-checked"
        dangerouslySetInnerHTML={{ __html: ico('check', '', 25) }}
      />
    </div>
  );
}

// Step 03: a row slides into the orders list
function Step3Illustration({
  channel,
  isActive,
}: {
  channel: WorkflowChannel;
  isActive: boolean;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="mini-board">
      <div className="mini-sidebar">
        <span dangerouslySetInnerHTML={{ __html: ico('store', '', 12) }} />
        <span dangerouslySetInnerHTML={{ __html: ico('receipt', '', 12) }} />
        <span dangerouslySetInnerHTML={{ __html: ico('dashboard', '', 12) }} />
      </div>
      <div className="mini-orders">
        <strong>Orders</strong>
        <motion.div
          initial={prefersReduced ? false : { x: -24, opacity: 0 }}
          animate={isActive && !prefersReduced ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <b>#1042</b>
          <span>{channel === 'qr' ? 'Table 12' : '1 Zinger Burger + Fries'}</span>
          <em className="mini-new">New</em>
        </motion.div>
        <div>
          <b>#1041</b>
          <span>{channel === 'qr' ? 'Table 8' : '2 Chicken Wraps'}</span>
          <em className="mini-preparing">Preparing</em>
        </div>
        <div>
          <b>#1040</b>
          <span>{channel === 'qr' ? 'Table 3' : '1 Beef Burger'}</span>
          <em className="mini-ready">Ready</em>
        </div>
      </div>
    </div>
  );
}

// Step 04: the status pill cycles New, Preparing, Ready
function Step4Illustration({
  isActive,
  stepTick,
}: {
  isActive: boolean;
  stepTick: number;
}) {
  // If active, cycle 0: New, 1: Preparing, 2: Ready
  const cycleIndex = isActive ? (stepTick % 3) : 1;

  return (
    <div className="kitchen-progress">
      <div className={`transition-transform duration-300 ${cycleIndex === 0 ? 'scale-110 font-bold' : 'opacity-70'}`}>
        <span className={cycleIndex === 0 ? '!bg-brand !text-white' : ''} dangerouslySetInnerHTML={{ __html: ico('chef', '', 31) }} />
        <small className={cycleIndex === 0 ? '!text-brand font-bold' : ''}>New</small>
      </div>
      <span className="kitchen-arrow" dangerouslySetInnerHTML={{ __html: ico('chevron', 'kitchen-arrow', 19) }} />
      <div className={`transition-transform duration-300 ${cycleIndex === 1 ? 'scale-110 font-bold' : 'opacity-70'}`}>
        <span className={cycleIndex === 1 ? '!bg-amber-500 !text-white' : ''} dangerouslySetInnerHTML={{ __html: ico('spoon', '', 29) }} />
        <small className={cycleIndex === 1 ? '!text-amber-600 font-bold' : ''}>Preparing</small>
      </div>
      <span className="kitchen-arrow" dangerouslySetInnerHTML={{ __html: ico('chevron', 'kitchen-arrow', 19) }} />
      <div className={`transition-transform duration-300 ${cycleIndex === 2 ? 'scale-110 font-bold' : 'opacity-70'}`}>
        <span className={cycleIndex === 2 ? '!bg-leaf !text-forest' : ''} dangerouslySetInnerHTML={{ __html: ico('cloche', '', 29) }} />
        <small className={cycleIndex === 2 ? '!text-forest font-bold' : ''}>Ready</small>
      </div>
    </div>
  );
}
