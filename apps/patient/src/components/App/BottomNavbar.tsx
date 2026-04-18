import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";
import HomeActiveIcon from "../../assets/icons/homeActive.svg";
import MessageInactiveIcon from "../../assets/icons/messageInactive.svg";
import MedRefillsInactiveIcon from "../../assets/icons/medRefillsInactive.svg";
import MoreInactiveIcon from "../../assets/icons/moreInactive.svg";

type NavItemProps = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

const NavItem = ({ label, icon, active = false }: NavItemProps) => (
  <TouchableOpacity activeOpacity={0.85} style={styles.navItem}>
    {active ? (
      <LinearGradient colors={["#14B8D4", "#0E7490"]} style={styles.activeIconWrap}>
        {icon}
      </LinearGradient>
    ) : (
      <View style={styles.inactiveIconWrap}>{icon}</View>
    )}
    <Text style={[styles.navLabel, active ? styles.navLabelActive : styles.navLabelInactive]}>{label}</Text>
  </TouchableOpacity>
);

const BottomNavbar = () => {
  return (
    <View style={styles.container}>
      <NavItem label="Home" icon={<HomeActiveIcon width={24} height={24} />} active />
      <NavItem label="Message" icon={<MessageInactiveIcon width={24} height={24} />} />
      <NavItem label="Med Refills" icon={<MedRefillsInactiveIcon width={24} height={24} />} />
      <NavItem label="More" icon={<MoreInactiveIcon width={24} height={24} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 16,
    height: 84,
    borderRadius: 10,
    backgroundColor: COLORS.SURFACE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#728EAB",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navItem: {
    width: 74,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  activeIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.95,
  },
  navLabel: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  },
  navLabelActive: {
    color: COLORS.PRIMARY,
    fontWeight: "500",
  },
  navLabelInactive: {
    color: COLORS.TEXT_PRIMARY_50,
    fontWeight: "400",
  },
});

export default BottomNavbar;
