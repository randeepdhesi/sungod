import type { ControlOption } from './types';

export const controlOptions: ControlOption[] = [
  {
    kind: 'remote',
    label: 'Handheld remote',
    body: 'One shade, one room or the whole house.',
    icon: 'broadcast-light'
  },
  {
    kind: 'wall-switch',
    label: 'Wall switch',
    body: 'A slim wireless keypad, placed where you need it.',
    icon: 'toggle-right-light'
  },
  {
    kind: 'app',
    label: 'Smartphone app',
    body: 'Adjust from the couch or from across the country.',
    icon: 'device-mobile-light'
  },
  {
    kind: 'voice',
    label: 'Voice',
    body: 'Works with popular voice assistants.',
    icon: 'microphone-light'
  },
  {
    kind: 'schedule',
    label: 'Schedules & sun-tracking',
    body: 'Open at sunrise, close at sunset, automatically.',
    icon: 'sun-horizon-light'
  }
];
