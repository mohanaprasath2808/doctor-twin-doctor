import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
        throw new Error("Physical device required");
    }

    // Existing permissions
    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
        const { status } =
            await Notifications.requestPermissionsAsync();

        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        throw new Error("Permission not granted");
    }

    const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;

    if (!projectId) {
        throw new Error("Project ID not found");
    }

    const token = (
        await Notifications.getExpoPushTokenAsync({
            projectId,
        })
    ).data;

    return token;
}