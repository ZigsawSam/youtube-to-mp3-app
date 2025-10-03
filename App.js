import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/convert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setDownloadLink(data.link);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>YouTube to MP3 Converter</h1>
      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleConvert} disabled={loading}>
        {loading ? 'Converting...' : 'Convert'}
      </button>
      {downloadLink && (
        <a href={downloadLink} target="_blank" rel="noopener noreferrer">
          Download MP3
        </a>
      )}
    </div>
  );
}

export default App;
