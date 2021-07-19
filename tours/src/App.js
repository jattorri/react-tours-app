import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const removeItem = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setTours(data);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button onClick={fetchTours} className="btn ">
            Reset
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeItem={removeItem} />
    </main>
  );
}

export default App;
