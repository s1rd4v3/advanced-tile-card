import { computeStateDisplay, HomeAssistant } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";


export const computeStateString = (entity: HassEntity, hass: HomeAssistant): string => {
  return computeStateDisplay(hass.localize, entity, hass.locale!);
};
