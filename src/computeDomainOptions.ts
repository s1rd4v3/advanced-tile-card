import { computeDomain, HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { computeStateString } from './helpers/computeStateString';
import { createDomainOptions } from './helpers/createDomainOptions';
import { getEntityColorRgb } from './helpers/getEntityColorRgb';
import { getEntityDomain } from './helpers/getEntityDomain';
import { isEntityActive } from './helpers/isEntityActive';
import { AdvancedTileCardConfig, DomainOptionsType } from './types';

const addEntityPictureAsIcon = (entity: HassEntity, domainStyles: Record<string, string>, variablename: string) => {
  if (entity.attributes.entity_picture) {
    domainStyles[`--${variablename}`] = `url(${entity.attributes.entity_picture})`;
    domainStyles[`--${variablename}-active`] = `url(${entity.attributes.entity_picture})`;
  }
};

export const computeDomainOptions = (
  entity: HassEntity,
  hass: HomeAssistant,
  config: AdvancedTileCardConfig,
): DomainOptionsType => {
  const domain = getEntityDomain(entity);
  const domainStyles = {};

  if (config.show_additional_state_icon && config.additional_state_icon_entity) {
    const additionalStateEntityDomain = computeDomain(config.additional_state_icon_entity || '');
    const additionalStateEntity = hass.states[config.additional_state_icon_entity];

    switch (additionalStateEntityDomain) {
      case 'person':
      case 'media_player':
      case 'camera':
        if (config.additional_state_icon_uses_entity_picture) {
          addEntityPictureAsIcon(additionalStateEntity, domainStyles, 'atc-additional-state-icon-background');
        }
        break;
        
      default:
        break;
    }
  }

  switch (domain) {
    case 'light':
      if (isEntityActive(entity)) {
        const lightRgbColor = `${getEntityColorRgb(entity) || 'var(--rgb-primary-color)'}`;
        domainStyles['--atc-icon-color-active'] = `rgb(${lightRgbColor})`;
        domainStyles['--atc-icon-background-active'] = `rgba(${lightRgbColor}, 0.2)`;
      }
      return createDomainOptions(
        { entity, hass, config },
        {
          domainStyles,
        },
      );

    case 'person':
    case 'camera':
      if (config.use_entity_picture_as_icon) {
        addEntityPictureAsIcon(entity, domainStyles, 'atc-icon-background');
      }

      return createDomainOptions(
        { entity, hass, config },
        {
          domainStyles,
        },
      );

    case 'lock':
      return createDomainOptions(
        { entity, hass, config },
        {
          domainStateString: entity.state !== 'locked' ? computeStateString(entity, hass) : false,
          domainStyles,
        },
      );

    case 'media_player':
      if (config.use_entity_picture_as_icon) {
        addEntityPictureAsIcon(entity, domainStyles, 'atc-icon-background');
      }
      return createDomainOptions(
        { entity, hass, config },
        {
          domainStyles,
          domainStateString:
            entity.state === 'playing'
              ? computeStateString(entity, hass)
              : false,
        },
      );

    case 'sensor':
      return createDomainOptions(
        { entity, hass, config },
        {
          domainStateString: entity.attributes.unit_of_measurement
            ? `${entity.state} ${entity.attributes.unit_of_measurement}`
            : false,
          domainStyles,
        },
      );
    case 'binary_sensor':
      return createDomainOptions(
        { entity, hass, config },
        {
          domainStateString: entity.state === 'on' ? computeStateString(entity, hass) : false,
          domainStyles,
        },
      );

    default:
      return createDomainOptions({ entity, hass, config }, {
          domainStyles,
        },);
  }
};
