import type { ReduxAction } from "@appsmith/constants/ReduxActionConstants";
import { ReduxActionTypes } from "@appsmith/constants/ReduxActionConstants";
import { createReducer } from "utils/ReducerUtils";

// Type for one environment
export interface EnvironmentType {
  id: string;
  name: string;
  workspaceId: string;
  isDefault?: boolean;
  userPermissions?: string[];
}

// Type for the environment state in redux
export interface EnvironmentsReduxState {
  /**
   * @param {boolean} isLoading - Whether the environments are being fetched
   */
  isLoading: boolean;
  /**
   * @param {boolean} error - Whether there was an error while fetching the environments
   */
  error: boolean;
  /**
   * @param {boolean} showEnvInfoModal - Whether to show the environment info modal before deploy
   */
  showEnvDeployInfoModal: boolean;
  /**
   * @param {EnvironmentType} data - The list of environments
   */
  data: EnvironmentType[];
}

// Initial state of the environment state in redux
export const initialEnvironmentState: EnvironmentsReduxState = {
  isLoading: false,
  showEnvDeployInfoModal: false,
  error: false,
  data: [],
};

// Reducer for the environment state in redux
const handlers = {
  [ReduxActionTypes.FETCH_ENVIRONMENT_INIT]: (
    state: EnvironmentsReduxState,
  ): EnvironmentsReduxState => ({
    ...state,
    isLoading: true,
  }),
  [ReduxActionTypes.FETCH_ENVIRONMENT_SUCCESS]: (
    state: EnvironmentsReduxState,
    action: ReduxAction<EnvironmentType[]>,
  ): EnvironmentsReduxState => ({
    ...state,
    isLoading: false,
    data: action.payload,
  }),
  [ReduxActionTypes.FETCH_ENVIRONMENT_FAILED]: (
    state: EnvironmentsReduxState,
  ): EnvironmentsReduxState => ({
    ...state,
    isLoading: false,
    error: true,
  }),
  [ReduxActionTypes.SHOW_ENV_INFO_MODAL]: (
    state: EnvironmentsReduxState,
  ): EnvironmentsReduxState => ({
    ...state,
    showEnvDeployInfoModal: true,
  }),
  [ReduxActionTypes.HIDE_ENV_INFO_MODAL]: (
    state: EnvironmentsReduxState,
  ): EnvironmentsReduxState => ({
    ...state,
    showEnvDeployInfoModal: false,
  }),
};

export default createReducer(initialEnvironmentState, handlers);
