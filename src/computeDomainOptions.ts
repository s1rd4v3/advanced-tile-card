import { HomeAssistant } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";
import { AdvancedTileCardConfig } from "./types";
import {
  DomainOptionsType,
  getEntityDomain,
  isEntityActive,
  createDomainOptions,
  playPauseAction,
  getEntityColorRgb,
  computeStateString
} from "./helpers";


export const computeDomainOptions = (entity: HassEntity, hass: HomeAssistant, config: AdvancedTileCardConfig): DomainOptionsType => {
  const domain = getEntityDomain(entity);

  const domainStyles = {};

  switch (domain) {
    case 'light':
      if (isEntityActive(entity)) {
        const lightRgbColor = `${getEntityColorRgb(entity) || 'var(--rgb-primary-color)'}`
        domainStyles['--atc-icon-color-active'] = `rgb(${lightRgbColor})`;
        domainStyles['--atc-icon-background-active'] = `rgba(${lightRgbColor}, 0.2)`;
      }
      return createDomainOptions({ entity, hass }, {
        domainStyles,
      });

    case 'person':
      if (config.use_entity_picture_as_icon && entity.attributes.entity_picture) {
        domainStyles['--atc-icon-background'] = `url(${entity.attributes.entity_picture})`;
        domainStyles['--atc-icon-background-active'] = `url(${entity.attributes.entity_picture})`;
      }

      return createDomainOptions({ entity, hass }, {
        domainStyles,
        domainStateString: entity.state !== 'home' ? computeStateString(entity, hass) : false,
        noToggleAction: true
      });

    case 'lock':
      return createDomainOptions({ entity, hass }, {
        domainStateString: entity.state !== 'locked' ? computeStateString(entity, hass) : false,
      });
    
    case 'alarm_control_panel':
      return createDomainOptions({ entity, hass }, {
        noToggleAction: true,
      });

    case 'media_player':
      return createDomainOptions({ entity, hass }, {
        domainStateString: entity.state === 'playing' ? entity.attributes.media_title ? entity.attributes.media_title : computeStateString(entity, hass) : false,
        domainToggleAction: () => playPauseAction(entity.entity_id, hass)
      });

    case 'camera':
      return createDomainOptions({ entity, hass }, {
        noToggleAction: true
      });

    case 'sensor':
      return createDomainOptions({ entity, hass }, {
        domainStateString: entity.attributes.unit_of_measurement ? `${entity.state} ${entity.attributes.unit_of_measurement}` : false,
        noToggleAction: true,
      });
    case 'binary_sensor':
      return createDomainOptions({ entity, hass }, {
        domainStateString: entity.state === 'on' ? computeStateString(entity, hass) : false,
        noToggleAction: true,
      });
    case 'sun':
      return createDomainOptions({ entity, hass }, {
        noToggleAction: true,
      });

    default:
      return createDomainOptions({ entity, hass });
  }
};
