import { useState, useEffect } from 'react';
import Torus from '@toruslabs/torus-embed';

const useTorus = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    const initializeTorus = async () => {
      const torus = new Torus();
      await torus.init({
        buildEnv: 'production',
        enableLogging: true,
        network: {
          host: 'mainnet',
          chainId: 1,
          networkName: 'Main Ethereum Network',
        },
        showTorusButton: true,
      });
      setProvider(torus.ethereum);
      console.log('Torus initialized and provider set:', torus.ethereum); // Debug log
    };

    initializeTorus();
  }, []);

  const connectTorus = async () => {
    if (!provider) {
      console.error('Provider not set');
      return;
    }

    try {
      await provider.request({ method: 'eth_requestAccounts' });
      const accounts = await provider.request({ method: 'eth_accounts' });
      console.log('Accounts retrieved:', accounts); // Debug log
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      });
      setWalletAddress(accounts[0]);
      console.log('Wallet Address set:', accounts[0]); // Debug log
      setBalance(balance.toString());
      console.log('Balance set:', balance.toString()); // Debug log
    } catch (error) {
      console.error('Error connecting to Torus:', error);
    }
  };

  return { walletAddress, balance, connectTorus };
};

export default useTorus;
