import navigationStrings from "../../../constants/navigationStrings";

export const DELEGATION_HOME_ROUTE = "DelegationHome";

export type DelegationAssignmentParams = {
  mode?: "assign" | "reassign";
};

export type DelegationActionCompletedParams = {
  title?: string;
  description?: string;
  buttonText?: string;
  showTimer?: boolean;
};

export type DelegationFlowParamList = {
  [DELEGATION_HOME_ROUTE]: undefined;
  [navigationStrings.DELEGATION_ASSIGN_TASK]: DelegationAssignmentParams | undefined;
  [navigationStrings.DELEGATION_REASSIGN_TASK]: DelegationAssignmentParams | undefined;
  [navigationStrings.DELEGATION_ESCALATE_MESSAGE]: undefined;
  [navigationStrings.DELEGATION_ACTION_COMPLETED]: DelegationActionCompletedParams | undefined;
  [navigationStrings.TASK_INBOX]: undefined;
};
