/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { HomeAssistant, fireEvent, LovelaceCardEditor, domainIcon, computeDomain } from 'custom-card-helpers';

import { AdvancedTileCardConfig } from '../types';
import { customElement, property, state } from 'lit/decorators';

import schema from './schema'
import { VISUAL_EDITOR_ID } from '../const';
import { setDefaultConfigValues } from '../helpers';

@customElement(VISUAL_EDITOR_ID)
export class AdvancedTileCardVisualEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: AdvancedTileCardConfig;

  @state() private _helpers?: any;

  private _initialized = false;

  public setConfig(config: AdvancedTileCardConfig): void {
    this._config = setDefaultConfigValues(config);

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );

    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _name(): string {
    return this._config?.name || '';
  }

  get _entity(): string {
    return this._config?.entity || '';
  }
  get _icon(): string {
    return this._config?.icon ||  (this._config?.entity && this.hass?.states[this._config.entity].attributes.icon) || domainIcon(computeDomain(this._config?.entity ?? '')) ||'';
  }

  _handleChange(ev: any): void {
    if (!this._config) return;

    const data = setDefaultConfigValues(ev.detail.value);
    
    this._config = { ...this._config, ...data };

    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    return html`
      <hui-card-picker lovelace=""></hui-card-picker>
      <ha-form
        .hass=${this.hass}
        .schema=${schema(this._icon, computeDomain(this._config?.entity ?? ''))}
        .data=${{...this._config}}
        .computeLabel=${(s) => s.label ?? s.name}
        @value-changed=${this._handleChange}
      ></ha-form>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue];
        this._config = tmpConfig;
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static styles: CSSResultGroup = css`
    mwc-select,
    mwc-textfield {
      margin-bottom: 16px;
      display: block;
    }
    mwc-formfield {
      padding-bottom: 8px;
    }
    mwc-switch {
      --mdc-theme-secondary: var(--switch-checked-color);
    }
  `;
}
