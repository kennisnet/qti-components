import { setCustomElementsManifest } from '@storybook/web-components-vite';
import { setStorybookHelpersConfig, type Options } from '@wc-toolkit/storybook-helpers';
import prettier from 'prettier-v2'; /* https://github.com/storybookjs/storybook/issues/8078#issuecomment-2325332120 */
import HTMLParser from 'prettier-v2/parser-html'; /* https://github.com/storybookjs/storybook/issues/8078#issuecomment-2325332120 */
import { expect } from 'storybook/test';
import { withThemeByClassName } from '@storybook/addon-themes';

import customElements from '../custom-elements.json';
import { toBePositionedRelativeTo } from '../test/setup/toBePositionedRelativeTo';

import type { Preview } from '@storybook/web-components-vite';

import '../src/lib/qti-components';
import '../src/lib/qti-test/core';
import '../src/lib/qti-test/components';
import '../src/lib/qti-item/core';
import '../src/item.css';

export const customViewports = {
  default: {
    name: 'Default',
    styles: {
      width: '412px',
      height: '780px'
    }
  },
  phone: {
    name: 'Phone',
    styles: {
      width: '412px',
      height: '780px'
    }
  },
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1257px',
      height: '598px'
    }
  }
};

const options: Options = {
  /** hides the `arg ref` label on each control */
  hideArgRef: true,
  /** sets the custom type reference in the Custom Elements Manifest */
  typeRef: 'expandedType',
  /** Adds a <script> tag where a `component` variable will reference the story's component */
  setComponentVariable: false,
  /** renders default values for attributes and CSS properties */
  renderDefaultValues: false
};

setStorybookHelpersConfig(options);

expect.extend({ toBePositionedRelativeTo });

setCustomElementsManifest(customElements);

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light-theme',
        dark: 'dark-theme'
      },
      defaultTheme: 'light'
    })
  ],

  parameters: {
    docs: {
      toc: true,
      codePanel: true,
      source: {
        /* FIXME EVENTUALLY https://github.com/storybookjs/storybook/issues/8078#issuecomment-2325332120 */
        transform: input =>
          prettier.format(input, {
            parser: 'html',
            plugins: [HTMLParser],
            printWidth: 140,
            htmlWhitespaceSensitivity: 'ignore'
          })
      }
    },
    viewport: { viewports: customViewports },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i
      }
    },
    options: {
      storySort: { method: 'alphabetical' }
    }
  },

  tags: ['!autodocs']
};

export default preview;
