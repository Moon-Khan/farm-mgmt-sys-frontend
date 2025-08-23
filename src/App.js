import { useState } from "react";
import './index.css';

function App() {
  const [helloMsg, setHelloMsg] = useState("");
  const [cronMsg, setCronMsg] = useState("");

  const callHelloAPI = async () => {
    try {
      const res = await fetch("https://your-backend.onrender.com/api/hello");
      const data = await res.json();
      setHelloMsg(`${data.message} | DB Time: ${data.db_time}`);
    } catch (err) {
      setHelloMsg("Error: " + err.message);
    }
  };  

  const callCronAPI = async () => {
    try {
      const res = await fetch("https://your-backend.onrender.com/api/cron");
      const data = await res.json();
      setCronMsg(`${data.message} at ${data.time}`);
    } catch (err) {
      setCronMsg("Error: " + err.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Farm Test App</h1>

      <button
        onClick={callHelloAPI}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-4"
      >
        Call Backend API
      </button>
      <p className="mt-2">{helloMsg}</p>

      <button
        onClick={callCronAPI}
        className="bg-green-600 text-white px-4 py-2 rounded-lg mt-6"
      >
        Call Cron API
      </button>
      <p className="mt-2">{cronMsg}</p>
    </div>
  );
}

export default App;
