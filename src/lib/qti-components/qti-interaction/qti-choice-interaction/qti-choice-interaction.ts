import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ChoicesMixin } from '../internal/choices/choices.mixin';
import { VocabularyMixin } from '../internal/vocabulary/vocabulary-mixin';
import styles from './qti-choice-interaction.styles';
import { Interaction } from '../../../exports/interaction';

import type { ChoicesInterface } from '../internal/choices/choices.mixin';
import type { CSSResultGroup } from 'lit';

export type Orientation = 'horizontal' | 'vertical' | undefined;

@customElement('qti-choice-interaction')
export class QtiChoiceInteraction
  extends VocabularyMixin(ChoicesMixin(Interaction, 'qti-simple-choice'), 'qti-simple-choice')
  implements ChoicesInterface
{
  static styles: CSSResultGroup = styles;

  /** @deprecated, use 'qti-orientation-horizontal' or 'qti-orientation-vertical' instead */
  @property({ type: String })
  public orientation: Orientation = 'vertical';

  private _handleSlotChange() {
    // count the number of choices, set a css variable for the number of choices
    const choices = this.querySelectorAll('qti-simple-choice');
    this.style.setProperty('--item-count', choices.length.toString());
  }

  render() {
    return html`
      <slot part="prompt" name="prompt"></slot>
      <slot part="slot" @slotchange=${this._handleSlotChange}></slot>
      <div part="message" role="alert" id="validation-message"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'qti-choice-interaction': QtiChoiceInteraction;
  }
}
