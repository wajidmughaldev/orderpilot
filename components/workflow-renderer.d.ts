export type WorkflowChannel = 'whatsapp' | 'web' | 'qr';
export type ChannelDefinition = { tab: string; icon: string; leftTitle: string; leftDescription: string; heading: string; description: string; step1: string; step1desc: string; step2desc: string };
export const channels: Record<WorkflowChannel, ChannelDefinition>;
export function ico(name: string, className?: string, size?: number): string;
export function leftPanel(mode: WorkflowChannel): string;
export function rightPanel(mode: WorkflowChannel): string;
