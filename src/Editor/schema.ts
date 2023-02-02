type ReturnType = {
  name: string;
  label?: string;
  type?: string;
  selector?: Record<string, unknown>;
  schema?: ReturnType[];
}[]

const schema = (icon: string, domain: string): ReturnType => {
  const generatedSchema = [
    {
      name: 'is_square',
      label: 'Square?',
      selector: {
        boolean: {}
      }
    },
    {
      name: 'entity',
      label: 'Entity',
      selector: {
        entity: {},
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'string',
    },
    {
      name: 'icon',
      label: 'Icon',
      selector: { icon: { placeholder: icon }, },
    },
    {
      name: 'show_state_string',
      label: 'Show state string?',
      selector: {
        boolean: {}
      }
    }
  ]

  if (domain === 'person') {
    generatedSchema.push({
      name: 'use_entity_picture_as_icon',
      label: 'Use entity picture as icon?',
      selector: {
        boolean: {}
      }
    })
  }
  if (domain === 'person' || domain === 'camera' || domain === 'media_player') {
    generatedSchema.push({
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