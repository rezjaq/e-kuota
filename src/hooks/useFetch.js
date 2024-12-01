import { useState, useEffect } from 'react';

const useFetch = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Start loading
      setError(null);    // Reset error state

      try {
        const result = await fetchFunction();  // Call the provided fetch function
        if (Array.isArray(result)) {
          setData(result);  // Set data if it's an array
        } else {
          setData([]);  // Clear data if not an array
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');  // Set error state
        setData([]);  // Clear data on error
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchData();  // Trigger the data fetching when the component mounts
  }, [fetchFunction]);  // Rerun only if the fetch function changes

  return { data, loading, error };  // Return data, loading, and error state
};

export default useFetch;  // Export the custom hook
