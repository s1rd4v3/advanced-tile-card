import { HassEntity } from "home-assistant-js-websocket";


export const getEntityColorRgb = (entity: HassEntity): string => {
  return entity.attributes.rgb_color.join(',') || undefined;
};
