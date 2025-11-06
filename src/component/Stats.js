import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { Group, Paper, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import classes from "./component.module.css";
import { formatAmount } from "../schemaValidation/Helpers";

export function Stats({ summary }) {
  const data = [
    {
      value: summary?.incomingTransactions || 0,
      title: "Incoming Transactions",
    },
    {
      value:summary?.outgoingTransfers || 0,
      title: "Outgoing Transactions",
    },
    {
      value: formatAmount(summary?.totalAmountReceived || 0),
      title: "Total Amount Received",
    },
    {
      value: formatAmount(summary?.totalAmountSent || 0),
      title: "Total Amount Sent",
    },
    {
      value: formatAmount( summary?.totalTransactions || 0),
      title: "Total Transactions",
    },
  ];
  console.log("Stats summary prop:", summary);
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="apart">
          <div>
            <Text
              c="dimmed"
              tt="uppercase"
              fw={700}
              fz="xs"
              className={classes.labelStats}
            >
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color:
                stat.diff > 0
                  ? "var(--mantine-color-teal-6)"
                  : "var(--mantine-color-red-6)",
            }}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text c="dimmed" fz="sm" mt="md">
          <Text component="span" c={stat.diff > 0 ? "teal" : "red"} fw={700}>
            {stat.diff}%
          </Text>{" "}
          {stat.diff > 0 ? "increase" : "decrease"} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.rootStats}>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}
