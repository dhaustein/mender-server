// Copyright 2019 Northern.tech AS
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
import { TIMEOUTS } from '@northern.tech/store/constants';
import { act } from '@testing-library/react';
import { vi } from 'vitest';

import { undefineds } from '../../../../../tests/mockData';
import { render } from '../../../../../tests/setupTests';
import { DistributionReport } from './Distribution';

describe('Distribution Component', () => {
  it('renders correctly', async () => {
    const { baseElement } = render(
      <DistributionReport
        onClick={vi.fn}
        onSave={vi.fn}
        selection={{ group: '', attribute: 'artifact_name', index: 0, type: 'distribution', chartType: 'pie' }}
        software={{}}
      />
    );
    await act(async () => {
      vi.runAllTimers();
      vi.runAllTicks();
      return new Promise(resolve => resolve(), TIMEOUTS.oneSecond);
    });
    const view = baseElement;
    expect(view).toMatchSnapshot();
    expect(view).toEqual(expect.not.stringMatching(undefineds));
  });
});
