import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./Spinner";

const MockAPIEndpoint = "http://localhost:3000/items";
function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Function to fetch data
    const fetchItem = async () => {
      try {
        if (!hasMore) return; // Stop fetching if there are no more items
        setLoading(true);
        const response = await fetch(
          `${MockAPIEndpoint}?page=${page}&limit=10`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.length !== 0) {
          setHasMore(false);
        }
        setItems((prevItems) => [...prevItems, ...data]);
        setPage(page + 1);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Add a scroll event listener to trigger infinite scrolling

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchItem();
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Initial data fetch
    fetchItem();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMore]);
  return (
    <div>
      <h1 className="text-center heading">Infinite Scrolling in react</h1>
      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="item">
            <div className="detail">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>

            <div className="img">
              <img src={item.image} alt={item.name} />
            </div>
          </div>
        ))}
      </div>
      {loading && <Spinner />}
      {error && <p className="text-center" >Error: {error.message}</p>}
      {!hasMore && <p className="text-center">No more items to load.</p>}
    </div>
  );
}

export default App;
