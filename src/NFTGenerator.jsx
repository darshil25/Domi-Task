import React from 'react';
import { sha256 } from 'js-sha256';

function NFTGenerator({ address, onNFTGenerated }) {
  const generateNFT = () => {
    const timestamp = Date.now().toString();
    const data = `${address.display_name}-${timestamp}`;
    const token = sha256(data);
    onNFTGenerated(token);
  };

  return (
    <div className="nft-generator">
      <button onClick={generateNFT}>Generate NFT</button>
    </div>
  );
}

export default NFTGenerator;