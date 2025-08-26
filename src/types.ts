import { ActionConfig, LovelaceCardConfig } from 'custom-card-helpers';

export interface AdvancedTileCardConfig extends LovelaceCardConfig {
  type: string;
  card_rows: string;
  card_columns: string;
  name?: string;
  test_gui?: boolean;
  entity?: string;
  use_entity_picture_as_icon?: boolean;
  use_entity_picture_as_background?: boolean;
  show_state_string?: boolean;
  conditional_state?: boolean;
  if_state?: string;
  attribute_to_show: string;
  tap_action: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  icon_tap_action: ActionConfig;
  icon?: string;
  use_attribute_as_state?: boolean;
  show_additional_state_icon?: boolean;
  additional_state_icon_entity?: string;
  additional_state_icon_entity_icon?: string;
  additional_state_icon_entity_tap_action?: ActionConfig;
}

export type DomainOptionsType = {
  domainClasses: Record<string, boolean>;
  domainStyles: Record<string, string>;
  domainStateString?: string | boolean;
};
