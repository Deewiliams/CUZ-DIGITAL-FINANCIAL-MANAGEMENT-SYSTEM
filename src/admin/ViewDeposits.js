import React from "react";
import {
  Container,
  Text,
  Table,
  Card,
  Badge,
  Group,
  Stack,
  Box,
  ActionIcon,
  Loader,
  Alert,
  Grid,
  Paper,
  Select,
} from "@mantine/core";
import {
  IconRefresh,
  IconInfoCircle,
  IconCoins,
  IconCalendar,
} from "@tabler/icons-react";
import { getDeposits } from "../services/authService";
import { formatAmount } from "../schemaValidation/Helpers";
import moment from "moment";

const ViewDeposits = () => {
  const [deposits, setDeposits] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM-DD")
  );

  console.log("ViewDeposits deposits state:", deposits);

  const fetchDeposits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDeposits();
      console.log("fetchDeposits response:", response);
      console.log("Response success:", response.success);
      console.log("Response data:", response.data);
      console.log("Response error:", response.error);

      if (response.success) {
        // Handle both array and object responses
        const depositData = Array.isArray(response.data)
          ? response.data
          : response.data.deposits || [];
        console.log("Setting deposits data:", depositData);
        setDeposits(depositData);
      } else {
        console.error("API returned error:", response.error);
        setError(response.error || "Failed to fetch deposits");
      }
    } catch (error) {
      console.error("fetchDeposits error:", error);
      setError("Network error occurred while fetching deposits");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDeposits();
  }, []);

  // Filter deposits by selected date
  const getDepositsForDate = (date) => {
    return deposits.filter(
      (deposit) => moment(deposit.createdAt).format("YYYY-MM-DD") === date
    );
  };

  // Calculate total amount for a specific date
  const getTotalForDate = (date) => {
    const dateDeposits = getDepositsForDate(date);
    return dateDeposits.reduce((total, deposit) => total + deposit.amount, 0);
  };

  // Get unique dates from all deposits
  const getAvailableDates = () => {
    const dates = deposits.map((deposit) =>
      moment(deposit.createdAt).format("YYYY-MM-DD")
    );
    return [...new Set(dates)].sort().reverse(); // Most recent first
  };

  // Get deposits for currently selected date
  const currentDayDeposits = getDepositsForDate(selectedDate);
  const totalForSelectedDate = getTotalForDate(selectedDate);

  // Get today's total
  const todayTotal = getTotalForDate(moment().format("YYYY-MM-DD"));
  const todayDepositsCount = getDepositsForDate(moment().format("YYYY-MM-DD"))
    .length;

  if (loading) {
    return (
      <Container>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Stack align="center">
            <Loader size="lg" />
            <Text>Loading deposits...</Text>
          </Stack>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert icon={<IconInfoCircle size="1rem" />} title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  const rows = currentDayDeposits.map((deposit) => (
    <Table.Tr key={deposit.id}>
      <Table.Td>
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            {deposit.account?.user?.name}
          </Text>
          <Text size="xs" c="dimmed">
            {deposit.account?.user?.email}
          </Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Text size="sm">{deposit.account?.accountNumber}</Text>
          <Badge size="xs" variant="light" color="blue">
            {deposit.account?.type}
          </Badge>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500} c="green">
          {formatAmount
            ? formatAmount(deposit.amount)
            : `K${deposit.amount.toLocaleString()}`}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{deposit.description || "No description"}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          {moment(deposit.createdAt).format("MMM DD, YYYY")}
        </Text>
        <Text size="xs" c="dimmed">
          {moment(deposit.createdAt).format("h:mm A")}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <div>
            <Text size="xl" fw={700}>
              Bank Deposits
            </Text>
            <Text size="sm" c="dimmed">
              Total deposits: {deposits.length}
            </Text>
          </div>
          <ActionIcon
            variant="light"
            onClick={fetchDeposits}
            loading={loading}
            size="lg"
          >
            <IconRefresh size="1.2rem" />
          </ActionIcon>
        </Group>

        {/* Daily Summary Cards */}
        <Grid>
          <Grid.Col span={6}>
            <Paper p="md" withBorder>
              <Group gap="sm">
                <IconCoins size="2rem" color="green" />
                <Box>
                  <Text size="lg" fw={700} c="green">
                    {formatAmount
                      ? formatAmount(todayTotal)
                      : `K${todayTotal.toLocaleString()}`}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Today's Total Deposits
                  </Text>
                  <Text size="xs" c="dimmed">
                    {todayDepositsCount} transactions
                  </Text>
                </Box>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper p="md" withBorder>
              <Group gap="sm">
                <IconCalendar size="2rem" color="blue" />
                <Box>
                  <Text size="lg" fw={700} c="blue">
                    {formatAmount
                      ? formatAmount(totalForSelectedDate)
                      : `K${totalForSelectedDate.toLocaleString()}`}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Selected Date Total
                  </Text>
                  <Text size="xs" c="dimmed">
                    {currentDayDeposits.length} transactions
                  </Text>
                </Box>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Date Filter */}
        <Card shadow="sm" padding="md">
          <Group gap="md" align="end">
            <Select
              label="Select Date"
              placeholder="Choose a date"
              value={selectedDate}
              onChange={setSelectedDate}
              data={getAvailableDates().map((date) => ({
                value: date,
                label:
                  moment(date).format("MMMM DD, YYYY") +
                  (date === moment().format("YYYY-MM-DD") ? " (Today)" : ""),
              }))}
              style={{ flex: 1 }}
            />
            <Text size="sm" c="dimmed">
              Showing deposits for{" "}
              {moment(selectedDate).format("MMMM DD, YYYY")}
            </Text>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg">
          {currentDayDeposits.length === 0 ? (
            <Box style={{ textAlign: "center", padding: "2rem" }}>
              <Text size="lg" c="dimmed">
                {deposits.length === 0
                  ? "No deposits found"
                  : `No deposits found for ${moment(selectedDate).format(
                      "MMMM DD, YYYY"
                    )}`}
              </Text>
              {deposits.length > 0 && (
                <Text size="sm" c="dimmed" mt="xs">
                  Try selecting a different date from the dropdown above
                </Text>
              )}
            </Box>
          ) : (
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Account Holder</Table.Th>
                  <Table.Th>Account Details</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Date & Time</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          )}
        </Card>
      </Stack>
    </Container>
  );
};

export default ViewDeposits;
