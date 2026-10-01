import {useState} from "react";

type HealthResponse = {
  status: string;
};

export function APIButton () {
  const [message, setMessage] = useState<string | null>(null);

  async function handleOnClick() {
    try {
      const res = await fetch('/api/health')

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data: HealthResponse = await res.json();
      setMessage(data.status);
      console.log(data);
    } catch (e) {
      setMessage('Error fetching API');
      console.error('Error fetching API:', e);
    }
  }

  return (
    <div>
      <button className="counter cursor-pointer" onClick={handleOnClick}>Test API</button>
      {message && <p>API response: {message}</p>}
    </div>
  );
}