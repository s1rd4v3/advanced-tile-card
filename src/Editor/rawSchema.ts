import { mdiGestureTap, mdiPlusBoxMultipleOutline, mdiStateMachine, mdiTextShort } from '@mdi/js';
import { HomeAssistant, computeDomain } from 'custom-card-helpers';
import { localLocalize } from '../localize/localLocalize';
import { AdvancedTileCardConfig } from '../types';
type SchemaObjectType = {
  condition: () => boolean;
  name: string;
  label?: string;
  type?: string;
  iconPath?: string;
  column_min_width?: string;
  title?: string;
  selector?: Record<string, unknown>;
  schema?: SchemaObjectType[];
};

export type SchemaType = {
  [key: string]: (childs?: SchemaObjectType[]) => SchemaObjectType;
};

const rawSchema = (icon: string, domain: string, config: AdvancedTileCardConfig, hass: HomeAssistant): SchemaType => {
  const additionalStateEntityDomain = computeDomain(config.additional_state_icon_entity || '');
  return {
  entity: () => ({
    condition: () => true,
    name: 'entity',
    label: hass.localize('ui.components.entity.entity-picker.entity'),
    selector: {
      entity: {},
    },
  }),
  name: () => ({
    condition: () => true,
    name: 'name',
    label: hass.localize('ui.dialogs.helper_settings.generic.name'),
    type: 'string',
  }),
  densed_layout: () => ({
    condition: () => true,
    name: 'densed_layout',
    label: `Densed layout?`,
    selector: {
      boolean: {},
    },
  }),
  icon: () => ({
    condition: () => true,
    name: 'icon',
    label: hass.localize('ui.dialogs.helper_settings.generic.icon'),
    selector: {
      icon: {
        placeholder: icon,
      },
    },
  }),
  icon_tap_action: () => ({
    condition: () => true,
    name: 'icon_tap_action',
    label: hass.localize('ui.panel.lovelace.editor.card.tile.icon_tap_action'),
    selector: {
      'ui-action': {},
    },
  }),
  show_additional_state_icon: () => ({
    condition: () => true,
    name: 'show_additional_state_icon',
    label: localLocalize("editor.show_additional_state_icon"),
    selector: {
      boolean: {},
    },
  }),
  additional_state_icon_entity: () => ({
    condition: () => !!config.show_additional_state_icon,
    name: 'additional_state_icon_entity',
    label: hass.localize('ui.components.entity.entity-picker.entity'),
    selector: {
      entity: {},
    },
  }),
  additional_state_icon_entity_icon: () => ({
    condition: () => !!config.show_additional_state_icon,
    name: 'additional_state_icon_entity_icon',
    label: hass.localize('ui.dialogs.helper_settings.generic.icon'),
    selector: {
      icon: {},
    },
  }),
  additional_state_icon_uses_entity_picture: () => ({
    condition: () => (additionalStateEntityDomain === 'person' || additionalStateEntityDomain === 'camera' || additionalStateEntityDomain === 'media_player') && !!config.show_additional_state_icon,
    name: 'additional_state_icon_uses_entity_picture',
    label: `${hass.localize('ui.dialogs.helper_settings.generic.icon')}: ${hass.localize(
      'ui.panel.lovelace.editor.card.tile.show_entity_picture',
    )}`,
    selector: {
      boolean: {},
    },
  }),
  additional_state_icon_entity_tap_action: () => ({
    condition: () => !!config.show_additional_state_icon,
    name: 'additional_state_icon_entity_tap_action',
    label: localLocalize('editor.tab_action_additional_state_icon'),
    selector: {
      'ui-action': {},
    },
  }),
  tap_action: () => ({
    condition: () => true,
    name: 'tap_action',
    label: hass.localize('ui.panel.lovelace.editor.card.generic.tap_action'),
    selector: {
      'ui-action': {},
    },
  }),
  show_state_string: () => ({
    condition: () => true,
    name: 'show_state_string',
    label: hass.localize('ui.panel.lovelace.editor.card.generic.show_state'),
    selector: {
      boolean: {},
    },
  }),
  conditional_state: () => ({
    condition: () => !!config.show_state_string,
    name: 'conditional_state',
    label: `${hass.localize('ui.panel.lovelace.editor.card.conditional.name')}?`,
    selector: {
      boolean: {},
    },
  }),
  if_state: () => ({
    condition: () => !!config.conditional_state,
    name: 'if_state',
    label: hass.localize('ui.panel.lovelace.editor.card.conditional.state_equal'),
    selector: {
      text: {},
    },
  }),
  use_attribute_as_state: () => ({
    condition: () => !!config.show_state_string,
    name: 'use_attribute_as_state',
    label: 'Use attribute as state',
    selector: {
      boolean: {},
    },
  }),
  attribute_to_show: () => ({
    condition: () => !!config.use_attribute_as_state,
    name: 'attribute_to_show',
    label: hass.localize('ui.panel.lovelace.editor.card.generic.attribute'),
    selector: {
      attribute: {
        entity_id: config.entity,
      },
    },
  }),
  use_entity_picture_as_icon: () => ({
    condition: () => domain === 'person' || domain === 'camera' || domain === 'media_player',
    name: 'use_entity_picture_as_icon',
    label: `${hass.localize('ui.dialogs.helper_settings.generic.icon')}: ${hass.localize(
      'ui.panel.lovelace.editor.card.tile.show_entity_picture',
    )}`,
    selector: {
      boolean: {},
    },
  }),
  use_entity_picture_as_background: () => ({
    condition: () =>
      parseInt(config.card_rows, 10) > 1 && (domain === 'person' || domain === 'camera' || domain === 'media_player'),
    name: 'use_entity_picture_as_background',
    label: `Background: ${hass.localize('ui.panel.lovelace.editor.card.tile.show_entity_picture')}`,
    selector: {
      boolean: {},
    },
  }),

  grid: (childs) => ({
    condition: () => true,
    name: '',
    type: 'grid',
    schema: childs,
  }),
  expandable_appearance: (childs) => ({
    condition: () => !!childs?.length,
    name: '',
    type: 'expandable',
    iconPath: mdiTextShort,
    title: hass.localize('ui.panel.lovelace.editor.card.generic.content'),
    schema: childs,
  }),
  expandable_actions: (childs) => ({
    condition: () => !!childs?.length,
    name: '',
    type: 'expandable',
    title: hass.localize('ui.panel.lovelace.editor.card.generic.interactions'),
    iconPath: mdiGestureTap,
    schema: childs,
  }),
  expandable_state: (childs) => ({
    condition: () => true,
    name: '',
    type: 'expandable',
    title: hass.localize('ui.panel.lovelace.editor.card.generic.state'),
    iconPath: mdiStateMachine,
    schema: childs,
  }),
  expandable_additional_state_icon_entity: (childs) => ({
    condition: () => true,
    name: '',
    type: 'expandable',
    title: localLocalize("editor.additional_state_icon_entity"),
    iconPath: mdiPlusBoxMultipleOutline,
    schema: childs,
  }),
}};

const schema = (icon: string, domain: string, config: AdvancedTileCardConfig, hass: HomeAssistant) => {
  const schemaObject = rawSchema(icon, domain, config, hass);
  const validatedSchema = {};
  Object.keys(schemaObject).forEach((key) => {
    validatedSchema[key] = (childs) => {
      const currentSchemaObject = schemaObject[key](childs);
      // Only add the schema object if the condition is true
      return currentSchemaObject.condition() ? currentSchemaObject : {};
    };
  });

  return validatedSchema as SchemaType;
};
export default schema;
