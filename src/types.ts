import { ActionConfig, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'advanced-tile-card-visual-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface AdvancedTileCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  test_gui?: boolean;
  entity?: string;
  use_entity_picture_as_icon?: boolean;
  use_entity_picture_as_background?: boolean;
  show_state_string?: boolean;
  tap_action: ActionConfig;
  icon_tap_action: ActionConfig;
  icon?: string;
  is_square?: boolean;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export type DomainOptionsType = {
  domainClasses: Record<string, boolean>,
  domainStyles: Record<string, string>,
  domainStateString?: string | boolean,
}