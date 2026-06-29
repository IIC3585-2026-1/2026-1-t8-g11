import RasterDisplay from "./components/RasterDisplay";
import { Toolbar } from "./components/Toolbar";
import { Provider } from "@/components/ui/provider";

export default function App() {
  return (
    <Provider forcedTheme="light">
      <Toolbar />
      <RasterDisplay />
    </Provider>
  );
}
