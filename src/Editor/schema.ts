import { mdiGestureTap, mdiPalette } from "@mdi/js";
import { HomeAssistant } from "custom-card-helpers";
import { AdvancedTileCardConfig } from "../types";

type ReturnType = {
  name: string;
  label?: string;
  type?: string;
  iconPath?: string;
  column_min_width?: string;
  title?: string;
  selector?: Record<string, unknown>;
  schema?: ReturnType;
}[]



const schema = (icon: string, domain: string, config: AdvancedTileCardConfig, hass: HomeAssistant) => {
  const generatedSchema: ReturnType = [
    {
      name: 'entity',
      label: 'Entity',
      selector: {
        entity: {},
      },
    },
    {
      name: "",
      type: "expandable",
      iconPath: mdiPalette,
      title: hass.localize(`ui.panel.lovelace.editor.card.tile.appearance`),
      schema: [
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: 'name',
              label: 'Name',
              type: 'string',
            },
            {
              name: 'icon',
              label: 'Icon',
              selector: {
                icon: {
                  placeholder: icon
                },
              },
            },
            {
              name: 'is_square',
              label: 'Square?',
              selector: {
                boolean: {}
              }
            },
            {
              name: 'show_state_string',
              label: 'Show state string?',
              selector: {
                boolean: {}
              }
            },
          ]
        },
      ]
    },
    {
      name: "",
      type: "expandable",
      title: hass.localize(`ui.panel.lovelace.editor.card.tile.actions`),
      iconPath: mdiGestureTap,
      schema: [
        {
          name: 'icon_tap_action',
          label: 'Icon Tap action',
          selector: {
            "ui-action": {}
          }
        },
        {
          name: 'tap_action',
          label: 'Tap action',
          selector: {
            "ui-action": {}
          }
        },
      ]
    },
  ];
  
  if (config.show_state_string) {
    generatedSchema[1].schema!.push({
      name: "",
      type: "expandable",
      title: 'State options',
      schema: [
        {
          name: "",
          type: "grid",
          column_min_width: "350px",
          schema: [
            {
              name: 'conditional_state',
              label: 'Conditional state',
              selector: {
                boolean: {}
              },
            },
            {
              name: 'use_attribute_for_state',
              label: 'Use attribute for state',
              selector: {
                boolean: {}
              },
            },
          ]
        },
      ]
    })
  } else {
    config.use_attribute_for_state = false;
    config.conditional_state = false;
  }

  if (config.conditional_state) {
    generatedSchema[1].schema![1].schema![0].schema!.push({
      name: 'if_state',
      label: 'If state is',
      selector: {
        text: {}
      }
    })
  } else {
    config.if_state = '';
  }

  if (config.use_attribute_for_state) {
    generatedSchema[1].schema![1].schema![0].schema!.push({
      name: 'attribute_to_show',
      label: 'Attribute',
      selector: {
        attribute: {
          entity_id: config.entity
        }
      }
    })
  } else {
    config.attribute_to_show = '';
  }

  if (domain === 'person') {
    generatedSchema[1].schema![0].schema!.push({
      name: 'use_entity_picture_as_icon',
      label: 'Use entity picture as icon?',
      selector: {
        boolean: {}
      }
    })
  }
  if (domain === 'person' || domain === 'camera' || domain === 'media_player') {
    generatedSchema[1].schema![0].schema!.push({
      name: 'use_entity_picture_as_background',
      label: 'Use entity picture as tile background?',
      selector: {
        boolean: {}
      }
    })
  }
  
  return generatedSchema;
};

export default schema;