import Header from "./Header";
import Speakers from "./Speakers";
import { useState, createContext } from "react";
import Layout from "./Layout";

function App() {
  return (
    <Layout startingTheme="light">
      <div>
        <Header />
        <Speakers />
      </div>
    </Layout>
  );
}

export default App;
