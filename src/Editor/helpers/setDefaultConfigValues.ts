import { computeDomain } from "custom-card-helpers";
import { AdvancedTileCardConfig } from "../../types";

let oldEntity;
// Defaulting some config options based on the entity domain
export const setDefaultConfigValues = (config: AdvancedTileCardConfig): AdvancedTileCardConfig => {
  const entityHasChanged = oldEntity !== config.entity;
  const domain = computeDomain(config.entity ?? '');

  if (!Object.keys(config).includes('is_square')) {
    config.is_square = true;
  }
  
  if (!Object.keys(config).includes('icon_tap_action') || !config.icon_tap_action || entityHasChanged) {
    switch (domain) {
      case 'person':
      case 'alarm_control_panel':
      case 'camera':
      case 'sensor':
      case 'binary_sensor':
      case 'sun':
        config.icon_tap_action = { action: 'more-info' };
        break;

      case 'scene':
        config.icon_tap_action = {
          action: "call-service",
          service: "scene.turn_on",
          target: {
            entity_id: config.entity
          }
        };
        break;
      case 'media_player':
        config.icon_tap_action = {
          action: "call-service",
          service: "media_player.media_play_pause",
          target: {
            entity_id: config.entity
          }
        };
        break;

      default:
        config.icon_tap_action = { action: 'toggle' };
        break;
    }
  }
  if (!Object.keys(config).includes('use_entity_picture_as_icon') || entityHasChanged) {
    config.use_entity_picture_as_icon =
      domain === 'person';
  }
  if (!Object.keys(config).includes('use_entity_picture_as_background' || entityHasChanged)) {
    config.use_entity_picture_as_background =
      domain === 'camera' ||
      domain === 'media_player';
  }
  if (!Object.keys(config).includes('show_state_string') || entityHasChanged) {
    config.show_state_string =
      domain === 'sensor';
  }

  oldEntity = config.entity;

  return config;
};
