import { HassEntity } from "home-assistant-js-websocket";
import { STATES_ON } from "../const";


export const isEntityActive = (entity: HassEntity): boolean => {
  return STATES_ON.includes(entity.state);
};
