/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionHandlerEvent,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  forwardHaptic,
  getLovelace,
  handleAction,
  hasConfigOrEntityChanged,
  stateIcon,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers
import { CSSResultGroup, LitElement, PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators';

import { HassEntity } from 'home-assistant-js-websocket';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { actionHandler } from '../action-handler-directive';
import { computeDomainOptions } from '../computeDomainOptions';
import { CARD_ID, VISUAL_EDITOR_ID } from '../const';
import { isEntityActive } from '../helpers/isEntityActive';
import { localize } from '../localize/localize';
import type { AdvancedTileCardConfig } from '../types';
import cardStyles from './styles.scss';

@customElement(CARD_ID)
export default class Card extends LitElement implements LovelaceCard {
  // https://lit.dev/docs/components/properties/

  @property({ attribute: false }) public hass!: HomeAssistant;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('../Editor/editor');
    return document.createElement(VISUAL_EDITOR_ID) as LovelaceCardEditor;
  }
  public static async getStubConfig(hass: HomeAssistant): Promise<Record<string, unknown>> {
    const entities = Object.keys(hass.states);
    // Pick first light entity for preview
    const lights = entities.filter((e) => ['light'].includes(e.split('.')[0]));
    return {
      entity: lights[0],
    };
  }

  @state() private isClicked = false;

  private isDragging = false;

  private entity?: HassEntity;

  @state() private config!: AdvancedTileCardConfig;

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: AdvancedTileCardConfig): void {
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    // this.className += config.is_double_height ? ' double-height' : '';

    this.config = config;
  }

  public getCardSize(): number {
    return parseInt(this.config.card_rows, 10);
  }

  public getGridSize() {
    return [this.config.card_columns, this.config.card_rows];
  }
  // TODO: Preparation for after v2024.3.0
  // public getLayoutOptions() {
  //   return {
  //     grid_columns: this.config.card_columns,
  //     grid_rows: this.config.card_rows,
  //   };
  // }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    if (!this.config.entity) {
      return this._showWarning(localize('common.missing_entity'));
    }

    // Set entity properties
    this.entity = this.hass?.states[this.config.entity];
    const entityIcon = this.config.icon || stateIcon(this.entity);
    const entityUsesEntityPictureAsIcon = this.config.use_entity_picture_as_icon || false;
    const entityUsesEntityPictureAsBackground = this.config.use_entity_picture_as_background || false;
    const showStateString = this.config.show_state_string || false;
    const isActive = isEntityActive(this.entity);
    const isUnavailable = this.entity === undefined || this.entity.state === 'unavailable';
    const isTallLayout = parseInt(this.config.card_rows, 10) > 1;
    const isWideLayout = parseInt(this.config.card_columns, 10) > 1;

    const { domainClasses, domainStyles, domainStateString } = computeDomainOptions(
      this.entity,
      this.hass,
      this.config,
    );

    const entityStyles = {
      ...domainStyles,
    };
    const entityClasses = {
      ...domainClasses,
      'is-clicked': this.isClicked,
      'is-active': isActive,
      'is-unavailable': isUnavailable,
      'is-tall-layout': isTallLayout,
      'is-wide-layout': isWideLayout,
      'entity-picture-as-icon': entityUsesEntityPictureAsIcon,
    };

    return html`
      <ha-card
        class="${classMap(entityClasses)}"
        @action=${this._handleTap}
        .actionHandler=${actionHandler()}
        style="${styleMap(entityStyles)}"
        tabindex="0"
      >
        ${entityUsesEntityPictureAsBackground &&
        parseInt(this.config.card_rows, 10) > 1 &&
        this.entity?.attributes.entity_picture
          ? html` <div class="background-image">
              <img src="${this.entity?.attributes.entity_picture}" />
            </div>`
          : ''}

        <div class="container">
          <div
            class="icon-area"
            role="button"
            @click=${this._handleIconTap}
            @touchend=${this._handleIconTap}
            @touchmove=${this._handleIconTouchMove}
          >
            <div class="icon-wrapper">
              ${!entityUsesEntityPictureAsIcon
                ? html` <ha-state-icon class="icon" .icon=${entityIcon}> </ha-state-icon> `
                : ''}
            </div>
          </div>

          <!-- ${isTallLayout ? html`<span class="state-icon-area"></span>` : ''} -->

          <div class="name-area">
            <span class="entity-name ellipsis"> ${this.config.name || this.entity.attributes.friendly_name} </span>
            ${showStateString ? html` <span class="entity-state ellipsis">${domainStateString || ''}</span> ` : ''}
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

  private _handleIconTouchMove() {
    this.isDragging = true;
  }

  private _handleIconTap(ev: CustomEvent) {
    if (this.isDragging) {
      this.isDragging = false;
      return;
    }
    ev.preventDefault();
    ev.stopPropagation();

    this.toggleClickClass();
    forwardHaptic('success');

    const config = {
      entity: this.config.entity,
      tap_action: this.config.icon_tap_action,
    };

    handleAction(this, this.hass, config, 'tap');
  }

  private toggleClickClass(): void {
    this.isClicked = true;

    setTimeout(() => {
      this.isClicked = false;
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

declare global {
  interface HTMLElementTagNameMap {
    'advanced-tile-card-visual-editor': LovelaceCardEditor;
    'advanced-tile-card': Card;
    'hui-error-card': LovelaceCard;
  }
}
