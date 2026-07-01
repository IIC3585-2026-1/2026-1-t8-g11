import RasterDisplay from "./components/RasterDisplay";
import { Toolbar } from "./components/Toolbar";
import { Provider } from "@/components/ui/provider";
import { Flex } from "@chakra-ui/react";

export default function App() {
  return (
    <Provider forcedTheme="light">
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        padding={4}
        gap={5}
        bg="#FFFBEB"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      >
        <Toolbar />
        <RasterDisplay />
      </Flex>
    </Provider>
  );
}
