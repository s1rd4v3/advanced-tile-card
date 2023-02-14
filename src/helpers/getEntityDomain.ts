import { computeDomain } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";


export const getEntityDomain = (entity: HassEntity): string => {
  return computeDomain(entity.entity_id);
};
