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
        schemaObject.densed_layout(),
      ]),
      schemaObject.use_entity_picture_as_icon(),
      schemaObject.use_entity_picture_as_background(),
    ]),
    schemaObject.expandable_state([
      schemaObject.show_state_string(),
      schemaObject.grid([
        schemaObject.conditional_state(),
        schemaObject.if_state()
      ]),
      schemaObject.grid([
        schemaObject.use_attribute_as_state(),
        schemaObject.attribute_to_show()
      ]),
    ]),
    schemaObject.expandable_additional_state_icon_entity([
      schemaObject.show_additional_state_icon(),
      schemaObject.additional_state_icon_entity(),
      schemaObject.additional_state_icon_entity_icon(),
      schemaObject.additional_state_icon_uses_entity_picture(),
    ]),
    schemaObject.expandable_actions([
      schemaObject.tap_action(),
      schemaObject.icon_tap_action(),
      schemaObject.additional_state_icon_entity_tap_action(),
    ]),
  ];

  return schemaStructure;
};

export default schema;
