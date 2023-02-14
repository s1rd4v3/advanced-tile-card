/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, unsafeCSS, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  hasAction,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  getLovelace,
  stateIcon,
  forwardHaptic,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import type { AdvancedTileCardConfig } from '../types';
import { actionHandler } from '../action-handler-directive';
import { CARD_ID, VISUAL_EDITOR_ID } from '../const';
import { localize } from '../localize/localize';
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { HassEntity } from 'home-assistant-js-websocket';
import cardStyles from './styles.scss';
import { isEntityActive } from "../helpers/isEntityActive";
import { computeDomainOptions } from "../computeDomainOptions";

@customElement(CARD_ID)
export default class Card extends LitElement {
  // https://lit.dev/docs/components/properties/
  
  @property() public hass!: HomeAssistant;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('../Editor/editor');
    return document.createElement(VISUAL_EDITOR_ID) as LovelaceCardEditor;
  }
  public static async getStubConfig(hass: HomeAssistant): Promise<Record<string, unknown>> {
    const entities = Object.keys(hass.states);
    // Pick first light entity for preview
    const lights = entities.filter((e) => ['light'].includes(e.split(".")[0]));
    return {
      entity: lights[0],
    };
  }

  private isInitialized = false;
  @state() private isClicked = false;

  private entity?: HassEntity;
  private entityIcon?: string;
  private entityDomain?: string;
  private entityUsesEntityPictureAsIcon = false;
  private entityUsesEntityPictureAsBackground = false;
  private showStateString = false;
  @state() private entityIsActive = false;
  private entityClasses: Record<string, boolean> = {};
  private entityStyles: Record<string, string> = {}; 


  

  @state() private config!: AdvancedTileCardConfig;

  getCardSize(): number | Promise<number> {
    return 1;
}

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: AdvancedTileCardConfig): void {
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }
    
    this.className += config.is_square ? ' square' : '';
    
    this.config = config;
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    if(!this.config.entity) {
      return this._showWarning(localize('common.missing_entity'));
    }

    // Set entity properties
    this.entity = this.hass.states[this.config.entity];
    this.entityIcon = this.config.icon || stateIcon(this.entity);
    this.entityDomain = this.entity?.entity_id.split('.')[0];
    this.entityUsesEntityPictureAsIcon = this.config.use_entity_picture_as_icon || false;
    this.entityUsesEntityPictureAsBackground = this.config.use_entity_picture_as_background || false;
    this.showStateString = this.config.show_state_string || false;
    this.entityIsActive = isEntityActive(this.entity);

    const {
      domainClasses,
      domainStyles,
      domainStateString,
    } = computeDomainOptions(this.entity, this.hass, this.config);
    
    this.entityStyles = {
      ...domainStyles
    };
    this.entityClasses = {
      ...this.entityClasses,
      ...domainClasses,
      clicked: this.isClicked,
      active: this.entityIsActive
    };

    return html`
      <ha-card
        class="${classMap(this.entityClasses)}"
        @action=${this._handleTap}
        .actionHandler=${actionHandler({
          hasHold: hasAction(this.config.hold_action),
          hasDoubleClick: hasAction(this.config.double_tap_action),
        })}
         style="${styleMap(this.entityStyles)}"
        tabindex="0"
      >
      ${this.entityUsesEntityPictureAsBackground && this.entity?.attributes.entity_picture ? html`
        <div class="background-image">
          <img src="${this.entity?.attributes.entity_picture}">
        </div>` : ''
      }

        <div class="container">

          <div
            class="icon-area"
            role="button"
            @click=${this._handleIconTap}
            @touchend=${this._handleIconTap}
          >
            <div class="icon-wrapper">
              ${!this.entityUsesEntityPictureAsIcon ? html`
                <ha-state-icon class="icon" .icon=${this.entityIcon}>
                </ha-state-icon>
              ` : ''}
            </div>
          </div>

          <span class="state-icon-area"></span>

          <div class="name-area">
            <span class="entity-name ellipsis">
              ${this.config.name || this.entity.attributes.friendly_name}
            </span>
            ${this.showStateString ? html`
              <span class="entity-state ellipsis">${domainStateString || ''}</span>
            ` : ''
            }
          </div>

        </div>
      </ha-card>
    `;
  }

  private _handleTap(ev: ActionHandlerEvent) {
    this.toggleClickClass();
    forwardHaptic('light');

    handleAction(this, this.hass, this.config, ev.detail.action);
  }

  private _handleIconTap(ev: CustomEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    this.toggleClickClass();
    forwardHaptic('success');

    const config = {
      entity: this.config.entity,
      tap_action: this.config.icon_tap_action,
    };

    handleAction(this, this.hass, config, "tap");
  }

  private toggleClickClass(): void {
    this.isClicked = true;

    setTimeout(() => {
      this.isClicked = false
    }, 500);
  }

  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return unsafeCSS(cardStyles);
  }
}
