import React from 'react';

export default function MetaMaskSupportModal({ onSupport, onDecline, txStatus }) {
  const isPending = txStatus === 'pending';
  const isRejected = txStatus === 'rejected';
  const isError = txStatus === 'error';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-gray-900 border border-yellow-700/40 rounded-3xl p-8 shadow-[0_0_50px_rgba(234,179,8,0.2)] text-center">

        <div className="text-5xl mb-4">⚔️</div>

        <p className="text-[10px] font-black text-yellow-500/60 uppercase tracking-[0.3em] mb-2">
          Web3 Support
        </p>
        <h2 className="text-xl font-black text-white italic tracking-tight mb-4">
          このアプリを応援しませんか？
        </h2>

        <p className="text-sm text-gray-400 font-serif leading-relaxed mb-6">
          ご支援いただいた軍師殿には<br />
          <span className="text-yellow-400 font-bold">黄金モード</span>を特別に解放いたします。<br />
          <span className="text-gray-500 text-xs">（軍資金として 0.01 POL をご提供ください）</span>
        </p>

        {(isRejected || isError) && (
          <p className="text-red-400 text-xs mb-4 bg-red-900/20 border border-red-500/30 rounded-lg px-3 py-2">
            {isRejected
              ? 'トランザクションがキャンセルされました'
              : 'エラーが発生しました。再度お試しください。'}
          </p>
        )}

        <button
          onClick={onSupport}
          disabled={isPending}
          className={`w-full py-3 rounded-xl font-black text-sm tracking-widest mb-3 transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
            isPending
              ? 'bg-yellow-800/40 border-yellow-900 text-yellow-600 cursor-wait animate-pulse'
              : 'bg-gradient-to-r from-yellow-700 to-yellow-600 border-yellow-900 text-white shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:from-yellow-600 hover:to-yellow-500'
          }`}
        >
          {isPending ? '⏳ 送金処理中...' : '🪙 応援する（0.01 POL）'}
        </button>

        <button
          onClick={onDecline}
          disabled={isPending}
          className="w-full py-2 rounded-xl text-xs text-gray-500 hover:text-gray-300 transition-colors disabled:opacity-30"
        >
          いいえ、通常コンテンツのみ利用する
        </button>

        <p className="text-[9px] text-gray-600 mt-4 font-serif italic">
          ※ Polygon ネットワーク上で処理されます
        </p>
      </div>
    </div>
  );
}
