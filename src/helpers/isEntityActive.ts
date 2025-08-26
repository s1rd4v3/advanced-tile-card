import { HassEntity } from "home-assistant-js-websocket";
import { STATES_ON } from "../const";


export const isEntityActive = (entity?: HassEntity): boolean => {
  return entity ? STATES_ON.includes(entity.state) : false;
};
