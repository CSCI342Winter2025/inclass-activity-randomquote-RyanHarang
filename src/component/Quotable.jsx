import React from "react";
import { useState, useEffect } from "react";
import "./quote.css";

function Quotable() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random"
      );

      if (!response.ok) {
        console.error("Failed to fetch quote");
        return;
      }

      const responseJson = await response.json();
      const quote = responseJson[0];
      setQuotes((prevQuotes) => [...prevQuotes, quote]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateQuote();
  }, []);

  const deleteQuote = (indexToDelete) => {
    setQuotes(quotes.filter((quotes, index) => index !== indexToDelete));
  };

  return (
    <div className="app-container">
      <h1 className="title">Random Quote Generator</h1>
      <button className="btn1" onClick={updateQuote}>
        New Quote
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div className="quotes-container">
        {quotes.length === 0 && !loading ? (
          <p>No quotes available. Click "New Quote" to fetch one.</p>
        ) : (
          quotes.map((quote, index) => (
            <div key={quote._id ? quote._id : index} className="quote-card">
              <p className="quote-content">{quote.q}</p>
              {quote.a && <p className="quote-author">— {quote.a}</p>}
              <button className="delete-btn" onClick={() => deleteQuote(index)}>
                Delete Quote
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Quotable;
