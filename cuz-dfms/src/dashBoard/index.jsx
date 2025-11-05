import { useState } from "react";
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
  IconMenu2,
  IconUserPlus,
  IconTransfer,
  IconReceipt,
  IconLibrary,
} from "@tabler/icons-react";
import {
  Code,
  Group,
  Avatar,
  Burger,
  Drawer,
  Stack,
  Box,
  Text,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./dashBoard.module.css";

const data = [
  { link: "", label: "Balance", icon: IconLibrary },
  { link: "", label: "Pay & Transfer", icon: IconTransfer },
  { link: "", label: "Add beneficiary ", icon: IconUserPlus },
  { link: "", label: "Notifications", icon: IconBellRinging },
  { link: "", label: " receipts", icon: IconReceipt },
];

export function Dashboard() {
  const [active, setActive] = useState("Billing");
  const { logout, token, user } = useAuth();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);

  console.log("Dashboard user:", user);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        close(); // Close mobile drawer when link is clicked
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <div className={classes.dashboardContainer}>
      {/* Desktop Header - visible on large screens */}
      <header className={classes.desktopHeader}>
        <div className={classes.desktopHeaderContent}>
          <Text size="xl" fw={700} className={classes.bankName}>
            Forever Trust Bank
          </Text>
          <Group gap="md" className={classes.rightHeaderGroup}>
            <Text>Welcome, {user?.user?.name}</Text>
            <IconBellRinging size={20} className={classes.notificationIcon} />
            <Avatar
              src={null}
              alt="User avatar"
              radius="xl"
              className={classes.desktopHeaderAvatar}
              size="md"
            />
          </Group>
        </div>
      </header>

      {/* Header bar for mobile with burger and avatar */}
      <div className={classes.mobileHeader}>
        <Group justify="space-between" className={classes.mobileHeaderContent}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            <Text size="lg" fw={600}>
              Dashboard
            </Text>
          </Group>
          <Avatar
            src={null}
            alt="User avatar"
            radius="xl"
            className={classes.avatar}
            size="md"
          />
        </Group>
      </div>

      {/* Desktop Sidebar */}
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            {/* <MantineLogo size={28} /> */}
            <Code fw={700}>v3.1.2</Code>
            <Avatar
              src={null}
              alt="User avatar"
              radius="xl"
              className={classes.desktopAvatar}
              size="sm"
            />
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              handleLogout();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        padding="md"
        title="Menu"
        className={classes.mobileDrawer}
      >
        <Stack gap="xs">
          {data.map((item) => (
            <a
              key={`mobile-${item.label}`}
              className={classes.mobileLink}
              data-active={item.label === active || undefined}
              href={item.link}
              onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                close();
              }}
            >
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <Text>{item.label}</Text>
            </a>
          ))}

          <div className={classes.mobileDivider} />

          <a
            className={classes.mobileLink}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              close();
            }}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <Text>Change account</Text>
          </a>

          <a
            className={classes.mobileLink}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              handleLogout();
              close();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <Text>Logout</Text>
          </a>
        </Stack>
      </Drawer>

      {/* Main content area */}
      <div className={classes.content}>
        <Box p="md">
          <Text size="xl" fw={600} mb="md">
            {active}
          </Text>
          <Text>This is the {active.toLowerCase()} section content.</Text>
        </Box>
      </div>
    </div>
  );
}
