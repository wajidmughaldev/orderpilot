'use client';

import { useState } from 'react';
import {
  channels, ico, leftPanel, rightPanel,
  type WorkflowChannel,
} from './workflow-renderer';

const ORDER_CHANNELS: WorkflowChannel[] = ['whatsapp', 'web', 'qr'];

/**
 * OrderPilot conversion-site workflow section.
 *
 * Content is generated as trusted, static HTML from workflow-renderer.js,
 * so there is no HTML input from users. The tabs and accessibility state
 * are owned by React. Individual product illustrations are composed from
 * HTML/CSS/SVG and small extracted food-photo assets, NOT a screenshot.
 *
 * Add `import './workflow.css'` to app/layout.tsx (see example).
 */
export default function OrderWorkflow() {
  const [channel, setChannel] = useState<WorkflowChannel>('whatsapp');

  function onTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? ORDER_CHANNELS.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : ORDER_CHANNELS.length - 1)) % ORDER_CHANNELS.length;
    setChannel(ORDER_CHANNELS[next]);
    document.getElementById(`tab-${ORDER_CHANNELS[next]}`)?.focus();
  }

  return (
    <div className="page-container">
      <header className="section-heading mb-10">
        <p className="eyebrow section-heading-eyebrow">HOW IT WORKS</p>
        <h2 className="section-title">From order to kitchen, in four steps.</h2>
        <p className="section-description mt-4">Customers order the way they already do. Your team sees it all in one place.</p>
      </header>
      <section className="workflow-shell" aria-label="OrderPilot ordering steps" data-current-channel={channel}>
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
              onClick={() => setChannel(item)}
              onKeyDown={(event) => onTabKeyDown(event, i)}
            >
              <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: ico(channels[item].icon, '', 22) }} />
              <span>{channels[item].tab}</span>
            </button>
          ))}
        </div>
        <div
          id="workflow-panels"
          className="workflow-main"
          role="tabpanel"
          aria-labelledby={`tab-${channel}`}
          tabIndex={0}
        >
          <div className="showcase" dangerouslySetInnerHTML={{ __html: leftPanel(channel) }} />
          <div className="journey" dangerouslySetInnerHTML={{ __html: rightPanel(channel) }} />
        </div>
      </section>
    </div>
  );
}
