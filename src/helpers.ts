import { computeStateDisplay, computeDomain, HomeAssistant, toggleEntity } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";
import { STATES_ON } from "./const";
import { AdvancedTileCardConfig } from "./types";

export const getEntityDomain = (entity: HassEntity): string => {

  return computeDomain(entity.entity_id);
};

// put first letter of each word in uppercase
export const capitalizeString = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
};

export const playPauseAction = (entityId: string, hass: HomeAssistant): ReturnType<HomeAssistant['callService']> => {
  return hass.callService("media_player", 'media_play_pause', {
      entity_id: entityId,
    });
}
export const turnOnScene = (entityId: string, hass: HomeAssistant): ReturnType<HomeAssistant['callService']> => {
  return hass.callService("scene", 'turn_on', {
      entity_id: entityId,
    });
}

export type DomainOptionsType = {
  domainClasses: Record<string, boolean>,
  domainStyles: Record<string, string>,
  noToggleAction: boolean,
  domainToggleAction: () => ReturnType<HomeAssistant['callService']>,
  domainStateString?: string | boolean,
}

export const computeStateString = (entity: HassEntity, hass: HomeAssistant): string => {
  return computeStateDisplay(hass.localize, entity, hass.locale!);
};

export const getEntityColorRgb = (entity: HassEntity): string => {
  return entity.attributes.rgb_color.join(',') || undefined;
}

export const isEntityActive = (entity: HassEntity): boolean => {
  return STATES_ON.includes(entity.state);
}

export const createDomainOptions = (
  {entity, hass}: {entity: HassEntity, hass: HomeAssistant},
  {
    domainClasses = {},
    domainStyles = {},
    noToggleAction = false,
    domainToggleAction = () => toggleEntity(hass, entity.entity_id),
    domainStateString = false,
  }: Partial<DomainOptionsType> | undefined = {}
  ): DomainOptionsType => {
  const domain = getEntityDomain(entity);

  return {
    domainClasses: {
      [`domain-${domain}`]: true,
      ...domainClasses,
    },
    domainStyles,
    noToggleAction: noToggleAction,
    domainToggleAction: domainToggleAction,
    domainStateString: domainStateString || computeStateString(entity, hass),
  }
}

export const setDefaultConfigValues = (config: AdvancedTileCardConfig): AdvancedTileCardConfig => {
  const domain = computeDomain(config.entity ?? '');


  // Defaulting some config options
  if (!Object.keys(config).includes('is_square')) {
    config.is_square = true;
  }
  if (!Object.keys(config).includes('use_entity_picture_as_icon')) {
    if (domain === 'person') {
      config.use_entity_picture_as_icon = true;
    }
  }
  if (!Object.keys(config).includes('use_entity_picture_as_background')) {
    if (domain === 'camera' || domain === 'media_player') {
      config.use_entity_picture_as_background = true;
    }
  }
  if (!Object.keys(config).includes('show_state_string')) {
    if (domain === 'sensor') {
      config.show_state_string = true;
    }
  }

  return config;
}