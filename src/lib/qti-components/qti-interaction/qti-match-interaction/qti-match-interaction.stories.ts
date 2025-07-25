import { action } from 'storybook/actions';
import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { expect, fn, waitFor, within } from 'storybook/test';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import drag from '../../../../testing/drag';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { QtiAssessmentItem, QtiMatchInteraction } from '../../';
import type { InputType } from 'storybook/internal/types';

import '../../../../item.css';

const { events, args, argTypes, template } = getStorybookHelpers('qti-match-interaction');

type Story = StoryObj<QtiMatchInteraction & typeof args>;

/**
 *
 * ### [3.2.9 Match Interaction](https://www.imsglobal.org/spec/qti/v3p0/impl#h.be4ll1tm4t99)
 * a block interaction that presents candidates with two sets of choices and allows them to create associations between pairs of choices in the two sets, but not between pairs of choices in the same set.
 *
 */
const meta: Meta<QtiMatchInteraction & { class: InputType; 'response-identifier': string }> = {
  component: 'qti-match-interaction',
  title: '3.2 interaction types/09 Match',

  subcomponents: { QtiSimpleAssociableChoice: 'qti-simple-associable-choice' },
  args: { ...args, 'response-identifier': 'RESPONSE' } /* set default value for response-identifier */,
  argTypes: {
    ...argTypes,
    class: {
      options: ['qti-choices-top', 'qti-choices-bottom', 'qti-choices-left', 'qti-choices-right', 'qti-match-tabular'],
      control: { type: 'select' },
      table: { category: 'Styling' }
    }
  },
  parameters: {
    actions: {
      handles: events
    }
  },
  tags: ['autodocs', 'no-tests']
};
export default meta;

export const Default: Story = {
  render: args =>
    template(
      /* add data-testid to args, without adding it to the controls of the story */
      { ...args, 'data-testid': 'match-interaction' },
      html`<qti-prompt>Match the following characters to the Shakespeare play they appeared in:</qti-prompt>
        <qti-simple-match-set>
          <qti-simple-associable-choice identifier="C" match-max="1">Capulet</qti-simple-associable-choice>
          <qti-simple-associable-choice identifier="D" match-max="1">Demetrius</qti-simple-associable-choice>
          <qti-simple-associable-choice identifier="L" match-max="1">Lysander</qti-simple-associable-choice>
          <qti-simple-associable-choice identifier="P" match-max="1">Prospero</qti-simple-associable-choice>
        </qti-simple-match-set>

        <qti-simple-match-set>
          <qti-simple-associable-choice identifier="M" match-max="2">A Midsummer-Nights</qti-simple-associable-choice>
          <qti-simple-associable-choice identifier="R" match-max="2">Romeo and Juliet</qti-simple-associable-choice>
          <qti-simple-associable-choice identifier="T" match-max="2">The Tempest</qti-simple-associable-choice>
        </qti-simple-match-set>`
    )
};

const testTemplate = html`<qti-prompt
    >Match the following characters to the Shakespeare play they appeared in:</qti-prompt
  >
  <qti-match-interaction data-testid="match-interaction" response-identifier="RESPONSE" max-associations="3">
    <qti-simple-match-set>
      <qti-simple-associable-choice identifier="C" match-max="1">Capulet</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="D" match-max="1">Demetrius</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="L" match-max="1">Lysander</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="P" match-max="1">Prospero</qti-simple-associable-choice>
    </qti-simple-match-set>

    <qti-simple-match-set>
      <qti-simple-associable-choice identifier="M" match-max="2">A Midsummer-Nights</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="R" match-max="2">Romeo and Juliet</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="T" match-max="2">The Tempest</qti-simple-associable-choice>
    </qti-simple-match-set>
  </qti-match-interaction>`;

const multipleAssociationsTemplate = html` <qti-match-interaction
  response-identifier="match_languages_countries"
  shuffle="false"
  max-associations="5"
  min-associations="0"
>
  <qti-prompt>Can you match the cities below with the language most likely to be spoken there?</qti-prompt>
  <qti-simple-match-set>
    <qti-simple-associable-choice identifier="french" fixed="false" show-hide="show" match-max="0" match-min="0"
      >French</qti-simple-associable-choice
    >
    <qti-simple-associable-choice identifier="hungarian" fixed="false" show-hide="show" match-max="0" match-min="0"
      >Hungarian</qti-simple-associable-choice
    >
    <qti-simple-associable-choice identifier="polish" fixed="false" show-hide="show" match-max="0" match-min="0"
      >Polish</qti-simple-associable-choice
    >
    <qti-simple-associable-choice identifier="dutch" fixed="false" show-hide="show" match-max="0" match-min="0"
      >Dutch</qti-simple-associable-choice
    >
    <qti-simple-associable-choice identifier="lithuanian" fixed="false" show-hide="show" match-max="0" match-min="0"
      >Lithuanian</qti-simple-associable-choice
    >
  </qti-simple-match-set>
  <qti-simple-match-set>
    <qti-simple-associable-choice identifier="budapest" fixed="false" show-hide="show" match-max="0" match-min="0"
      >Budapest</qti-simple-associable-choice
    >
    <qti-simple-associable-choice identifier="vilnius" fixed="false" show-hide="show" match-max="0" match-min="0"
      >Vilnius</qti-simple-associable-choice
    >
    <qti-simple-associable-choice identifier="paris" fixed="false" show-hide="show" match-max="0" match-min="0"
      >Paris</qti-simple-associable-choice
    >
    <qti-simple-associable-choice identifier="amsterdam" fixed="false" show-hide="show" match-max="0" match-min="0"
      >Amsterdam</qti-simple-associable-choice
    >
    <qti-simple-associable-choice identifier="warsaw" fixed="false" show-hide="show" match-max="0" match-min="0"
      >Warsaw</qti-simple-associable-choice
    >
  </qti-simple-match-set>
</qti-match-interaction>`;

const multipleAssociations2Template = html`
  <div>
    <p>Which properties do the following animal classes have?</p>

    <qti-match-interaction max-associations="3" response-identifier="RESPONSE">
      <qti-simple-match-set>
        <qti-simple-associable-choice identifier="r1" match-max="0">
          <p>Asexual</p>
        </qti-simple-associable-choice>
        <qti-simple-associable-choice identifier="r2" match-max="0">
          <p>Endothermic</p>
        </qti-simple-associable-choice>
        <qti-simple-associable-choice identifier="r3" match-max="0">
          <p>Possess Gills</p>
        </qti-simple-associable-choice>
        <qti-simple-associable-choice identifier="r4" match-max="0">
          <p>Bear Live Young</p>
        </qti-simple-associable-choice>
      </qti-simple-match-set>
      <qti-simple-match-set>
        <qti-simple-associable-choice identifier="h1" match-max="2">Birds</qti-simple-associable-choice>
        <qti-simple-associable-choice identifier="h2" match-max="2">Reptiles</qti-simple-associable-choice>
        <qti-simple-associable-choice identifier="h3" match-max="2">Mammals</qti-simple-associable-choice>
      </qti-simple-match-set>
    </qti-match-interaction>
  </div>
  <p>Select all choices that apply.</p>
`;

const optionsRightTemplate = html`
  <qti-match-interaction response-identifier="RESPONSE" shuffle="true" max-associations="4" class="qti-choices-right">
    <qti-prompt>Combineer de teksten</qti-prompt>
    <qti-simple-match-set>
      <qti-simple-associable-choice identifier="A1" match-max="1">Berlijn</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A2" match-max="1">Amsterdam</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A3" match-max="1">Parijs</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A4" match-max="1">Brussel</qti-simple-associable-choice>
    </qti-simple-match-set>
    <qti-simple-match-set>
      <qti-simple-associable-choice identifier="B1" match-max="1">Duitsland</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B2" match-max="1">Nederland</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B3" match-max="1">Frankrijk</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B4" match-max="1">Belgie</qti-simple-associable-choice>
    </qti-simple-match-set>
  </qti-match-interaction>
`;

const manyOptionsTemplate = html`
  <div>
    <p><strong>Organellen en hun functies.</strong><br/><br/>Geef in het overzicht van de verschillende organellen in cellen hun functies.</p>
  </div>
  <qti-match-interaction response-identifier="RESPONSE" shuffle="true" max-associations="7">
    <qti-simple-match-set>
      <qti-simple-associable-choice identifier="A1" fixed="false" match-max="1" match-min="0">
        endoplasmatisch reticulum
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A2" fixed="false" match-max="1" match-min="0">
        ribosomen
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A3" fixed="false" match-max="1" match-min="0">
        mitochondriën
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A4" fixed="false" match-max="1" match-min="0">
        lysosomen
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A5" fixed="false" match-max="1" match-min="0">
        golgi-apparaat
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A6" fixed="false" match-max="1" match-min="0">
        kern
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A7" fixed="false" match-max="1" match-min="0">
        centrosomen

      </qti-simple-associable-choice>
    </qti-simple-match-set>
    <qti-simple-match-set>
      <qti-simple-associable-choice identifier="B1" fixed="false" match-max="1" match-min="0">
        isolatie en vervoer van eiwitten
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B2" fixed="false" match-max="1" match-min="0">
        aanmaak van eiwitten
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B3" fixed="false" match-max="1" match-min="0">
        energieproductie
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B4" fixed="false" match-max="1" match-min="0">
        afbreken en/of uitstoten van afval uit de cel
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B5" fixed="false" match-max="1" match-min="0">
        opslag van celproducten
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B6" fixed="false" match-max="1" match-min="0">
        besturing en voortplanting van de cel
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B7" fixed="false" match-max="1" match-min="0">
        vorming van draden bij de kerndeling

      </qti-simple-associable-choice>
    </qti-simple-match-set>
  </qti-match-interaction>
`;

const withImagesTemplate = html`
  <qti-match-interaction response-identifier="RESPONSE" shuffle="true" max-associations="3" class="qti-choices-bottom">
    <qti-prompt>Hoe heet iedereen?</qti-prompt>
    <qti-simple-match-set>
      <qti-simple-associable-choice identifier="A1" match-max="1">Ernie</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A2" match-max="1">Pino</qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="A3" match-max="1">Kermit</qti-simple-associable-choice>
    </qti-simple-match-set>
    <qti-simple-match-set>
      <qti-simple-associable-choice identifier="B1" match-max="1">
        <img src="qti-match-interaction/8c571f983f691e42e7b3a0dc2664e51d.png" alt="afbeelding"/>
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B2" match-max="1">
        <img src="qti-match-interaction/80378beafd6b12ab7b97899ce39a2b78.jpg" alt="afbeelding"/>
      </qti-simple-associable-choice>
      <qti-simple-associable-choice identifier="B3" match-max="1">
        <img src="qti-match-interaction/72c4b1f4ea9f7ba5548683c37806580e.png" alt="afbeelding"/>
      </qti-simple-associable-choice>
    </qti-simple-match-set>
  </qti-match-interaction>
`;

export const Test: Story = {
  render: () => testTemplate,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Retrieve interaction, source, and target elements from the canvas
    const interaction = canvas.getByTestId<QtiMatchInteraction>('match-interaction');
    const dragC = canvas.getByText('Capulet');
    const dropM = canvas.getByText('A Midsummer-Nights');

    // // Define the interaction response event handler to capture the response
    const interactionResponse = fn(event => {
      // Ensure the interaction response detail contains the expected values
      // console.log(event.detail.response);
    });

    // Add the event listener for 'qti-interaction-response'
    canvasElement.addEventListener('qti-interaction-response', interactionResponse);

    try {
      await step('Drag 1 to drop and test qti-interaction-response event', async () => {
        // Simulate the drag and drop operation
        await drag(dragC, { to: dropM, duration: 500 });
      });

      await step('Drag capulus to drop and test qti-interaction-response event', async () => {
        // Simulate the drag and drop operation
        await drag(dragC, { to: dropM, duration: 500 });

        // Wait for the interaction response event to be triggered and verify the handler was called
      });
      await waitFor(() => expect(interactionResponse).toHaveBeenCalled());
    } finally {
      // Clean up the event listener to avoid memory leaks
      canvasElement.removeEventListener('qti-interaction-response', interactionResponse);
    }
    await step('Reset interaction and set response manually', async () => {
      // Reset the interaction to ensure it is in a known state after the drag and drop
      interaction.reset();

      // Manually set the interaction response to the expected value
      interaction.response = ['C M'];

      await new Promise(resolve => setTimeout(resolve, 100));

      // Verify that after the drag-and-drop action, the target contains an element with text Capulet
      expect(dropM).toHaveTextContent('A Midsummer-Nights'); // warning, do not check if it contains the draggable, since it is a clone
    });
  }
};

export const Test2: Story = {
  render: () => testTemplate,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Retrieve interaction, source, and target elements from the canvas
    const interaction = canvas.getByTestId<QtiMatchInteraction>('match-interaction');
    const dragC = canvas.getByText('Capulet');
    const dragD = canvas.getByText('Demetrius');
    const dragL = canvas.getByText('Lysander');

    const dropM = canvas.getByText('A Midsummer-Nights');
    const dropR = canvas.getByText('Romeo and Juliet');

    // // Define the interaction response event handler to capture the response
    const interactionResponse = fn(event => {
      // Ensure the interaction response detail contains the expected values
      // console.log(event.detail.response);
    });

    // Add the event listener for 'qti-interaction-response'
    canvasElement.addEventListener('qti-interaction-response', interactionResponse);

    try {
      await step('Drag 1 to drop and test qti-interaction-response event', async () => {
        // Simulate the drag and drop operation
        await drag(dragC, { to: dropM, duration: 500 });
      });
      await step('Drag 2 to drop and test qti-interaction-response event', async () => {
        // Simulate the drag and drop operation
        await drag(dragD, { to: dropM, duration: 500 });
      });
      await step('Drag 3 to drop and test qti-interaction-response event', async () => {
        // Simulate the drag and drop operation
        await drag(dragL, { to: dropR, duration: 500 });
      });
    } finally {
      // Clean up the event listener to avoid memory leaks
      canvasElement.removeEventListener('qti-interaction-response', interactionResponse);
    }
    // FIXME: this does not work yet
    // const correctArray = ['C M', 'D M', 'L R'];
    // expect(interaction.response).toEqual(correctArray);
  }
};

export const DragMultiple: Story = {
  render: () => multipleAssociationsTemplate,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  }
};

export const DragMultiple2: Story = {
  render: () => multipleAssociations2Template,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  }
};

export const OptionsRight: Story = {
  render: () => optionsRightTemplate,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  }
};

export const ManyOptions: Story = {
  render: () => manyOptionsTemplate,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  }
};

export const WithImages: Story = {
  render: () => withImagesTemplate,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  }
};

export const Tabular = {
  render: () =>
    html`<qti-assessment-item
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
      xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd"
      identifier="match"
      title="Characters and Plays"
      adaptive="false"
      time-dependent="false"
      data-testid="qti-assessment-item"
    >
      <qti-response-declaration identifier="RESPONSE" cardinality="multiple" base-type="directedPair">
        <qti-correct-response>
          <qti-value>C R</qti-value>
          <qti-value>D M</qti-value>
          <qti-value>L M</qti-value>
          <qti-value>P T</qti-value>
        </qti-correct-response>
        <qti-mapping default-value="0">
          <qti-map-entry map-key="C R" mapped-value="1"></qti-map-entry>
          <qti-map-entry map-key="D M" mapped-value="0.5"></qti-map-entry>
          <qti-map-entry map-key="L M" mapped-value="0.5"></qti-map-entry>
          <qti-map-entry map-key="P T" mapped-value="1"></qti-map-entry>
        </qti-mapping>
      </qti-response-declaration>
      <qti-outcome-declaration identifier="SCORE" cardinality="single" base-type="float"></qti-outcome-declaration>
      <qti-item-body>
        <qti-match-interaction
          @qti-interaction-response="${action(`qti-interaction-response`)}"
          class="qti-match-tabular"
          response-identifier="RESPONSE"
          shuffle="true"
          max-associations="5"
        >
          <qti-prompt>Match the following characters to the Shakespeare play they appeared in:</qti-prompt>
          <qti-simple-match-set>
            <qti-simple-associable-choice identifier="C" match-max="1">Capulet</qti-simple-associable-choice>
            <qti-simple-associable-choice identifier="D" match-max="1">Demetrius</qti-simple-associable-choice>
            <qti-simple-associable-choice identifier="L" match-max="1">Lysander</qti-simple-associable-choice>
            <qti-simple-associable-choice identifier="P" match-max="1">Prospero</qti-simple-associable-choice>
          </qti-simple-match-set>
          <qti-simple-match-set>
            <qti-simple-associable-choice identifier="M" match-max="4"
              >A Midsummer-Night&apos;s Dream</qti-simple-associable-choice
            >
            <qti-simple-associable-choice identifier="R" match-max="4">Romeo and Juliet</qti-simple-associable-choice>
            <qti-simple-associable-choice identifier="T" match-max="4">The Tempest</qti-simple-associable-choice>
          </qti-simple-match-set>
        </qti-match-interaction>
      </qti-item-body>
      <qti-response-processing
        template="https://purl.imsglobal.org/spec/qti/v3p0/rptemplates/map_response.xml"
      ></qti-response-processing>
    </qti-assessment-item>`
};

export const TabularAardrijkskunde = {
  render: () => {
    const testRef = createRef<QtiAssessmentItem>();
    return html`<qti-assessment-item
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd
						http://www.duo.nl/schema/dep_extension ../dep_extension.xsd"
        title="3297cq"
        identifier="ITM-3297cq"
        time-dependent="false"
        label="3297cq"
         ${ref(testRef)}
              @qti-interaction-changed="${e => {
                testRef.value.processResponse();
                action(JSON.stringify(e.detail))();
              }}"
      @qti-outcome-changed="${e => {
        action(JSON.stringify(e.detail))();
      }}"
        xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
        xmlns:dep="http://www.duo.nl/schema/dep_extension"
      >
        <qti-response-declaration identifier="RESPONSE" cardinality="multiple" base-type="directedPair">
          <qti-correct-response interpretation="A&amp;B">
            <qti-value>y_A x_1</qti-value>
            <qti-value>y_B x_2</qti-value>
          </qti-correct-response>
        </qti-response-declaration>
        <qti-outcome-declaration identifier="SCORE" cardinality="single" base-type="float">
          <qti-default-value>
            <qti-value>0</qti-value>
          </qti-default-value>
        </qti-outcome-declaration>
        <qti-outcome-declaration identifier="MAXSCORE" cardinality="single" base-type="float">
          <qti-default-value>
            <qti-value>1</qti-value>
          </qti-default-value> </qti-outcome-declaration
        >
        <qti-item-body class="defaultBody" xml:lang="nl-NL">
          <qti-match-interaction
          id="matchInteraction1"
          class="qti-match-tabular "
          min-associations="2"
          max-associations="2"
          shuffle="false"
          response-identifier="RESPONSE"
        >
        <qti-prompt>Match the following characters to the Shakespeare play they appeared in:</qti-prompt>
          <qti-simple-match-set>
            <qti-simple-associable-choice identifier="y_A" match-max="1">
              <div>
                <p>Als koele lucht botst tegen warme vochtige lucht ontstaat frontale neerslag.</p>
              </div>
            </qti-simple-associable-choice>

            <qti-simple-associable-choice identifier="y_B" match-max="1">
              <div>
                <p>De aanvoer van koude lucht vanuit het noorden wordt door de ligging van gebergtes tegengehouden.</p>
              </div>
            </qti-simple-associable-choice>
          </qti-simple-match-set>
          <qti-simple-match-set>
            <qti-simple-associable-choice identifier="x_1" match-max="2">
              <div class="cito_genclass_BB_2017_A1-012_1">
                <p>juist</p>
              </div>
            </qti-simple-associable-choice>

            <qti-simple-associable-choice identifier="x_2" match-max="2">
              <div class="cito_genclass_BB_2017_A1-012_2">
                <p>onjuist</p>
              </div>
            </qti-simple-associable-choice>
          </qti-simple-match-set>
        </qti-match-interaction>

      	</qti-item-body>
             <qti-response-processing
    		template="https://purl.imsglobal.org/spec/qti/v3p0/rptemplates/match_correct.xml"></qti-response-processing>
    </qti-response-processing>
    </qti-assessment-item>`;
  }
};

export const TabularMultiple = {
  render: () =>
    html`<qti-assessment-item
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
      xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0 https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0_v1p0.xsd"
      identifier="match"
      title="Characters and Plays"
      adaptive="false"
      time-dependent="false"
    >
      <qti-response-declaration identifier="RESPONSE" cardinality="multiple" base-type="directedPair">
        <qti-correct-response>
          <qti-value>C R</qti-value>
          <qti-value>D M</qti-value>
          <qti-value>L M</qti-value>
          <qti-value>P T</qti-value>
        </qti-correct-response>
        <qti-mapping default-value="0">
          <qti-map-entry map-key="C R" mapped-value="1"></qti-map-entry>
          <qti-map-entry map-key="D M" mapped-value="0.5"></qti-map-entry>
          <qti-map-entry map-key="L M" mapped-value="0.5"></qti-map-entry>
          <qti-map-entry map-key="P T" mapped-value="1"></qti-map-entry>
        </qti-mapping>
      </qti-response-declaration>
      <qti-outcome-declaration identifier="SCORE" cardinality="single" base-type="float"></qti-outcome-declaration>
      <qti-item-body>
        <qti-match-interaction
          @qti-interaction-response="${action(`qti-interaction-response`)}"
          class="qti-match-tabular"
          response-identifier="RESPONSE"
          shuffle="true"
          max-associations="4"
        >
          <qti-prompt>Match the following characters to the Shakespeare play they appeared in:</qti-prompt>
          <qti-simple-match-set>
            <qti-simple-associable-choice identifier="C" match-max="2">Capulet</qti-simple-associable-choice>
            <qti-simple-associable-choice identifier="D" match-max="2">Demetrius</qti-simple-associable-choice>
            <qti-simple-associable-choice identifier="L" match-max="2">Lysander</qti-simple-associable-choice>
            <qti-simple-associable-choice identifier="P" match-max="2">Prospero</qti-simple-associable-choice>
          </qti-simple-match-set>
          <qti-simple-match-set>
            <qti-simple-associable-choice identifier="M" match-max="4"
              >A Midsummer-Night&apos;s Dream</qti-simple-associable-choice
            >
            <qti-simple-associable-choice identifier="R" match-max="4">Romeo and Juliet</qti-simple-associable-choice>
            <qti-simple-associable-choice identifier="T" match-max="4">The Tempest</qti-simple-associable-choice>
          </qti-simple-match-set>
        </qti-match-interaction>
      </qti-item-body>
      <qti-response-processing
        template="https://purl.imsglobal.org/spec/qti/v3p0/rptemplates/map_response.xml"
      ></qti-response-processing>
    </qti-assessment-item>`
};
