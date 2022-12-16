// import { useState } from "react";
import reactLogo from "@/assets/images/react.svg";

import "@/assets/styles/css/App.css";
import "@/assets/styles/css/main.css";

import { useCounterStore } from "../stores";
import { Link } from "react-router-dom";

function Home() {
  // const [count, setCount] = useState(0);
  const [zIncrement, zCount] = useCounterStore((state) => [state.setIncrement, state.count]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://zustand-demo.pmnd.rs">
          <img src="https://zustand-demo.pmnd.rs/favicon.ico" className="logo" alt="Zustand" />
        </a>
      </div>
      <h1>Vite + React + Zustand</h1>
      <div className="card-default">
        {/* <button onClick={() => setCount((count) => count + 1)}>count is {count}</button> */}
        <button onClick={() => zIncrement()}>count is {zCount}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <div className="row">
          <Link to="/student" style={{ margin: 4 }}>
            <button>Student</button>
          </Link>
          <Link to="/about">
            <button>About</button>
          </Link>
        </div>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default Home;
