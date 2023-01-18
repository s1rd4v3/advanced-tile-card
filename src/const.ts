export const CARD_VERSION = '1.0.0';

export const CARD_ID = 'advanced-tile-card';
export const CARD_DETAILS = {
  type: CARD_ID,
  name: 'Advanced Tile Card',
  preview: true,
  description: 'More advanced tile card',
};

export const VISUAL_EDITOR_ID = `${CARD_DETAILS.type}-visual-editor`;

export const STATES_ON = [
  'on',
  'home',
  'armed_night',
  'armed_home',
  'armed_away',
  'closing',
  'closed',
  'locked',
  'playing',
];