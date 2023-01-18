import { ActionConfig, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'advanced-tile-card-visual-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

// TODO Add your configuration elements here for type-checking
export interface AdvancedTileCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  test_gui?: boolean;
  entity?: string;
  use_entity_picture_as_icon?: boolean;
  use_entity_picture_as_background?: boolean;
  show_state_string?: boolean;
  icon?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
