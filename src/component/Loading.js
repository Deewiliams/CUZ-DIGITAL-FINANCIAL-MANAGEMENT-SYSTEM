import { Box, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      display="flex"
      bg="rgba(255, 255, 255, 0.8)"
      style={{
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Loader size={30} />
    </Box>
  );
};

export default Loading;
