import axios from "axios";
import { useEffect, useState } from "react";

// This custom hook centralizes and streamlines handling of HTTP calls
export default function useFetch(url) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await axios.get(url);

        setData(response.data.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data };
}
