import { HomeAssistant } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";
import { getEntityDomain } from "./getEntityDomain";
import { DomainOptionsType } from "../types";
import { computeStateString } from "./computeStateString";


export const createDomainOptions = (
  { entity, hass }: { entity: HassEntity; hass: HomeAssistant; },
  {
    domainClasses = {}, domainStyles = {}, domainStateString = false,
  }: Partial<DomainOptionsType> | undefined = {}
): DomainOptionsType => {
  const domain = getEntityDomain(entity);

  return {
    domainClasses: {
      [`domain-${domain}`]: true,
      ...domainClasses,
    },
    domainStyles,
    domainStateString: domainStateString || computeStateString(entity, hass),
  };
};
