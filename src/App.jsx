import { Box } from "@mui/material";
import "./App.scss";
import"../src/style/card.scss";
import"../src/style/cards.scss";

import { MyContextProvider } from "./MyContext/MyContext";
import ObjectList from "./Component/ObjectList";

function App() {
  return (
    <MyContextProvider>
      <ObjectList />
    </MyContextProvider>
  );
}

export default App;
