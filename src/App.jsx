// App.jsx
import React, { useState, useEffect } from 'react';
import AddressInput from './AddressInput';
import Map from './Map';
import NFTGenerator from './NFTGenerator';
import './App.css';

function App() {
  const [address, setAddress] = useState(null);
  const [nftToken, setNftToken] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showMap, setShowMap] = useState(true);

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setInputValue(selectedAddress.display_name);
    setNftToken(null);
    setShowMap(true);
  };

  const handleNFTGeneration = (token) => {
    setNftToken(token);
    setShowMap(false);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const toggleDisplay = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
    if (inputValue === '') {
      setAddress(null);
      setNftToken(null);
      setShowMap(true);
    } else if (inputValue !== address?.display_name) {
      setAddress(null);
      setNftToken(null);
      setShowMap(true);
    }
  }, [inputValue, address]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Address NFT Generator</h1>
      </header>
      <main className="app-main">
        <AddressInput onAddressSelect={handleAddressSelect} onInputChange={handleInputChange} />
        
        {address && (
          <div className="content-display">
            {showMap ? (
              <>
                <Map address={address} />
                {nftToken && (
                  <button className="switch-button" onClick={toggleDisplay}>
                    Switch to NFT
                  </button>
                )}
              </>
            ) : (
              <div className="nft-display">
                <h2>Generated NFT Token</h2>
                <p>{nftToken}</p>
                <button className="switch-button switch-button-nft" onClick={toggleDisplay}>
                  Switch to Map
                </button>
              </div>
            )}
            
            {!nftToken && <NFTGenerator address={address} onNFTGenerated={handleNFTGeneration} />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;