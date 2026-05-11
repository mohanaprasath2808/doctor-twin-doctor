import { Linking } from "react-native";

//to get the initials of the name
export const getInitials = (name: string) =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

//to open the google maps by coords
export const openGoogleMapsByCoords = async (latitude: number, longitude: number) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  await Linking.openURL(mapsUrl);
};

//to open phone dialer by number
export const openPhoneDialer = async (phoneNumber: string) => {
  const normalized = phoneNumber.replace(/[^\d+]/g, "");
  await Linking.openURL(`tel:${normalized}`);
};

//to get current day as short lowercase text
export const getCurrentDayShort = () =>
  new Date().toLocaleDateString("en-US", { weekday: "short" }).toLowerCase();

//get current date
export const getCurrentDate = () =>
  new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

//LOCAL STORAGE
export const LOCAL_STORAGE_KEYS = {
  FACE_ID_ENABLED: "faceIdEnabled",
};

//EMAIL REGEX
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const padTwo = (n: number): string => `${Math.floor(n)}`.padStart(2, "0");

/** Formats elapsed encounter seconds as `HH:MM:SS` for header timer UI. */
export function formatEncounterElapsed(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(Number.isFinite(totalSeconds) ? totalSeconds : 0));
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return `${padTwo(hours)}:${padTwo(minutes)}:${padTwo(seconds)}`;
}
