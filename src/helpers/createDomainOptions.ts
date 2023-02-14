import { HomeAssistant } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";
import { getEntityDomain } from "./getEntityDomain";
import { AdvancedTileCardConfig, DomainOptionsType } from "../types";
import { computeStateString } from "./computeStateString";


const showAttributeForState = (config: AdvancedTileCardConfig, entity: HassEntity): string | boolean => {
  if (config.use_attribute_for_state) {
    if (entity.attributes[config.attribute_to_show]) {
      return entity.attributes[config.attribute_to_show]
    }
  }
  return false
}

export const createDomainOptions = (
  { entity, hass, config }: { entity: HassEntity; hass: HomeAssistant; config: AdvancedTileCardConfig },
  {
    domainClasses = {}, domainStyles = {},
  }: Partial<DomainOptionsType> | undefined = {}
): DomainOptionsType => {
  const domain = getEntityDomain(entity);

  let domainStateString: boolean | string = false;
  if (config.show_state_string) {
    if (config.conditional_state) {
      if (config.if_state === entity.state) {
        domainStateString = showAttributeForState(config, entity) || computeStateString(entity, hass);
      }
    } else {
      domainStateString = showAttributeForState(config, entity) || computeStateString(entity, hass);
    }
  }

  return {
    domainClasses: {
      [`domain-${domain}`]: true,
      ...domainClasses,
    },
    domainStyles,
    domainStateString,
  };
};
