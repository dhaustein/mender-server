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
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import storeActions from '@northern.tech/store/actions';
import { DEVICE_STATES, onboardingSteps } from '@northern.tech/store/constants';
import {
  getAcceptedDevices,
  getAvailableIssueOptionsByType,
  getDeviceCountsByStatus,
  getOnboardingState,
  getTenantCapabilities,
  getUserCapabilities
} from '@northern.tech/store/selectors';
import { advanceOnboarding, getDeviceCount, getIssueCountsByType } from '@northern.tech/store/thunks';
import { useWindowSize } from '@northern.tech/utils/resizehook';

import { getOnboardingComponentFor } from '../../utils/onboardingManager';
import AcceptedDevices from './widgets/AcceptedDevices';
import ActionableDevices from './widgets/ActionableDevices';
import PendingDevices from './widgets/PendingDevices';
import RedirectionWidget from './widgets/RedirectionWidget';

const { setShowConnectingDialog } = storeActions;

export const Devices = ({ clickHandle }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const size = useWindowSize();
  const anchor = useRef();
  const pendingsRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { total: acceptedDevicesCount } = useSelector(getAcceptedDevices);
  const availableIssueOptions = useSelector(getAvailableIssueOptionsByType);
  const { canManageDevices } = useSelector(getUserCapabilities);
  const { hasReporting, plan } = useSelector(getTenantCapabilities);
  const onboardingState = useSelector(getOnboardingState);
  const { pending: pendingDevicesCount } = useSelector(getDeviceCountsByStatus);

  const refreshDevices = useCallback(() => {
    const issueRequests = Object.keys(availableIssueOptions).map(key =>
      dispatch(getIssueCountsByType({ type: key, options: { filters: [], selectedIssues: [key] } }))
    );
    return Promise.all([dispatch(getDeviceCount(DEVICE_STATES.accepted)), dispatch(getDeviceCount(DEVICE_STATES.pending)), ...issueRequests]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(availableIssueOptions), dispatch]);

  const showDismissHelptipsDialog = useSelector(state => !state.onboarding.complete && state.onboarding.showTipsDialog);
  const showDeviceConnectionDialog = useSelector(state => state.users.showConnectDeviceDialog);
  const showsDialog = showDismissHelptipsDialog || showDeviceConnectionDialog;

  useEffect(() => {
    // on render the store might not be updated so we resort to the API and let all later request go through the store
    // to be in sync with the rest of the UI
    refreshDevices();
  }, [refreshDevices]);

  const onConnectClick = () => {
    dispatch(setShowConnectingDialog(true));
    navigate('/devices/accepted');
  };

  let onboardingComponent = null;
  if (anchor.current && !showsDialog) {
    const element = anchor.current.children[anchor.current.children.length - 1];
    const deviceConnectionAnchor = { left: element.offsetLeft + element.offsetWidth / 2, top: element.offsetTop + element.offsetHeight - 50 };
    onboardingComponent = getOnboardingComponentFor(onboardingSteps.DASHBOARD_ONBOARDING_START, onboardingState, { anchor: deviceConnectionAnchor });
    if (pendingsRef.current) {
      const element = pendingsRef.current.lastChild;
      const pendingsAnchor = {
        left: pendingsRef.current.offsetLeft + element.offsetWidth / 2,
        top: pendingsRef.current.offsetTop + element.offsetHeight
      };
      onboardingComponent = getOnboardingComponentFor(onboardingSteps.DASHBOARD_ONBOARDING_PENDINGS, onboardingState, { anchor: pendingsAnchor });
    }
  }
  const shouldShowActionableDevices = plan !== 'os';
  return (
    <>
      <div className="dashboard" ref={anchor}>
        <AcceptedDevices devicesCount={acceptedDevicesCount} onClick={clickHandle} />
        {!!acceptedDevicesCount && shouldShowActionableDevices && <ActionableDevices issues={availableIssueOptions} />}
        {!!pendingDevicesCount && !(acceptedDevicesCount && hasReporting) && (
          <PendingDevices
            advanceOnboarding={step => dispatch(advanceOnboarding(step))}
            innerRef={pendingsRef}
            isActive={pendingDevicesCount > 0}
            onboardingState={onboardingState}
            onClick={clickHandle}
            pendingDevicesCount={pendingDevicesCount}
          />
        )}
        {canManageDevices && (
          <RedirectionWidget content={acceptedDevicesCount || pendingDevicesCount ? '+ connect more devices' : 'Connect a device'} onClick={onConnectClick} />
        )}
      </div>
      {onboardingComponent}
    </>
  );
};

export default Devices;
