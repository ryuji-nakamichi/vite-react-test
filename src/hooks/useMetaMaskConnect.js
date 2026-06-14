import { useState, useCallback } from 'react';

const RECIPIENT = '0xFa044dB3583E339b97291B4fc6916357d81183cC';
const POLYGON_CHAIN_ID = '0x89'; // 137
const SUPPORT_AMOUNT_WEI = '0x2386F26FC10000'; // 0.01 POL in wei
const SUPPORT_AMOUNT_POL = 0.01;

function activateGoldenMode() {
  localStorage.setItem('golden_mode_active', 'true');
  localStorage.setItem('war_funds_total', SUPPORT_AMOUNT_POL.toString());
  window.dispatchEvent(new StorageEvent('storage', { key: 'golden_mode_active', newValue: 'true' }));
  window.dispatchEvent(new StorageEvent('storage', { key: 'war_funds_total', newValue: SUPPORT_AMOUNT_POL.toString() }));
}

async function switchToPolygon() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: POLYGON_CHAIN_ID }],
    });
  } catch (err) {
    if (err.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: POLYGON_CHAIN_ID,
          chainName: 'Polygon Mainnet',
          nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
          rpcUrls: ['https://polygon-rpc.com'],
          blockExplorerUrls: ['https://polygonscan.com'],
        }],
      });
    } else {
      throw err;
    }
  }
}

export function useMetaMaskConnect() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [txStatus, setTxStatus] = useState(null); // null | 'pending' | 'rejected' | 'error'

  const isMetaMaskInstalled = typeof window !== 'undefined' && Boolean(window.ethereum);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) return;
    if (localStorage.getItem('golden_mode_active') === 'true') return;
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setShowSupportModal(true);
    } catch {
      // user rejected connection
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const openSupportModal = useCallback(() => {
    setTxStatus(null);
    setShowSupportModal(true);
  }, []);

  const sendSupportPayment = useCallback(async () => {
    if (!walletAddress) return;
    setTxStatus('pending');
    try {
      await switchToPolygon();
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: RECIPIENT,
          value: SUPPORT_AMOUNT_WEI,
        }],
      });
      activateGoldenMode();
      setShowSupportModal(false);
      setTxStatus(null);
    } catch (e) {
      setTxStatus(e.code === 4001 ? 'rejected' : 'error');
    }
  }, [walletAddress]);

  const dismissModal = useCallback(() => {
    setShowSupportModal(false);
    setTxStatus(null);
  }, []);

  return {
    isMetaMaskInstalled,
    walletAddress,
    showSupportModal,
    isConnecting,
    txStatus,
    connectWallet,
    openSupportModal,
    sendSupportPayment,
    dismissModal,
  };
}
