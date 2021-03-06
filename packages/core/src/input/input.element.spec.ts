/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { CdsInput } from '@cds/core/input';
import '@cds/core/input/register.js';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';

describe('cds-input', () => {
  let component: CdsInput;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`
      <cds-input>
        <label>input</label>
        <input type="text" />
      </cds-input>
    `);

    component = element.querySelector<CdsInput>('cds-input');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should create component', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
  });
});
