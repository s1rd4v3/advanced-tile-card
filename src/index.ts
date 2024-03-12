import Card from './Card/card';
import { CARD_DETAILS, CARD_VERSION } from './const';
import { localize } from './localize/localize';

// This puts your card into the UI card picker dialog
window.customCards = window.customCards || [];
window.customCards.push(CARD_DETAILS);

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    customCards?: unknown[];
  }
}

/* eslint no-console: 0 */
console.info(
  `%c  ${CARD_DETAILS.name} \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

export { Card };
