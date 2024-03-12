import { HomeAssistant } from 'custom-card-helpers';
import { AdvancedTileCardConfig } from '../types';
import rawSchema from './rawSchema';

const schema = (icon: string, domain: string, config: AdvancedTileCardConfig, hass: HomeAssistant) => {
  const schemaObject = rawSchema(icon, domain, config, hass);

  const schemaStructure = [
    schemaObject.entity(),
    schemaObject.expandable_appearance([
      schemaObject.grid([
        schemaObject.name(),
        schemaObject.icon(),
        schemaObject.card_rows(),
        schemaObject.card_columns(),
      ]),
      schemaObject.use_entity_picture_as_icon(),
      schemaObject.use_entity_picture_as_background(),
    ]),
    schemaObject.expandable_state([
      schemaObject.show_state_string(),
      schemaObject.grid([schemaObject.conditional_state(), schemaObject.if_state()]),
      schemaObject.grid([schemaObject.use_attribute_as_state(), schemaObject.attribute_to_show()]),
    ]),
    schemaObject.expandable_actions([schemaObject.tap_action(), schemaObject.icon_tap_action()]),
  ];

  return schemaStructure;
};

export default schema;
