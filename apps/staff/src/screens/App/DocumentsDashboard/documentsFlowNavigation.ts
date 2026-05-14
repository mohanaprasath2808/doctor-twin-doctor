import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import navigationStrings from "../../../constants/navigationStrings";
import type { AppStackParamList } from "../../../router/App/AppStack";

export function navigateDocumentsActionCompleted(
  navigation: NativeStackNavigationProp<AppStackParamList>,
  payload: { title: string; description: string; buttonText: string },
) {
  navigation.navigate(navigationStrings.BILLING_ACTION_COMPLETED, {
    headerTitle: "Action Completed",
    title: payload.title,
    description: payload.description,
    buttonText: payload.buttonText,
    completionNavigateTo: navigationStrings.DOCUMENTS_DASHBOARD,
  });
}
