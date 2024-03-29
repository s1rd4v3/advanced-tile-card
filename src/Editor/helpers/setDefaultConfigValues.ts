import { computeDomain } from 'custom-card-helpers';
import { AdvancedTileCardConfig } from '../../types';

let oldEntity;
// Defaulting some config options based on the entity domain
export const setDefaultConfigValues = (
  config: AdvancedTileCardConfig,
  isChangeEvent?: boolean,
): AdvancedTileCardConfig => {
  const entityHasChanged = isChangeEvent && oldEntity !== config.entity;
  const domain = computeDomain(config.entity ?? '');

  if (!Object.keys(config).includes('card_columns')) {
    config.card_columns = '2';
  }
  if (!Object.keys(config).includes('card_rows')) {
    config.card_rows = '2';
  }

  if (!Object.keys(config).includes('tap_action') || !config.tap_action || entityHasChanged) {
    switch (domain) {
      case 'person':
      case 'alarm_control_panel':
      case 'camera':
      case 'sensor':
      case 'binary_sensor':
      case 'sun':
        config.tap_action = { action: 'more-info' };
        break;

      case 'scene':
        config.tap_action = {
          action: 'call-service',
          service: 'scene.turn_on',
          target: {
            entity_id: config.entity,
          },
        };
        break;
      case 'media_player':
        config.tap_action = {
          action: 'call-service',
          service: 'media_player.media_play_pause',
          target: {
            entity_id: config.entity,
          },
        };
        break;
      case 'cover':
        config.tap_action = {
          action: 'call-service',
          service: 'cover.toggle',
          target: {
            entity_id: config.entity,
          },
        };
        break;

      default:
        config.tap_action = { action: 'toggle' };
        break;
    }
  }
  if (!Object.keys(config).includes('use_entity_picture_as_icon') || entityHasChanged) {
    config.use_entity_picture_as_icon = domain === 'person';
  }
  if (!Object.keys(config).includes('use_entity_picture_as_background' || entityHasChanged)) {
    config.use_entity_picture_as_background = domain === 'camera' || domain === 'media_player';
  }
  if (!Object.keys(config).includes('show_state_string') || entityHasChanged) {
    config.show_state_string = domain === 'sensor';
  }

  oldEntity = config.entity;

  return config;
};
