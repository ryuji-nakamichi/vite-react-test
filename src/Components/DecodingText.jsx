import React, { useState, useEffect, useRef } from 'react';

// ランダムに表示する文字のプール
// なるべく幅が揃いやすい半角英数字記号を中心に構成します
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

const DecodingText = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  // ★追加：デコード中かどうかを管理するフラグ
  const [isDecoding, setIsDecoding] = useState(true);

  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // 初期化
    setDisplayText('');
    currentIndexRef.current = 0;
    setIsDecoding(true); // 開始時にtrueにする

    intervalRef.current = setInterval(() => {
      let tempText = '';
      // 確定した部分
      tempText += text.substring(0, currentIndexRef.current);

      // まだ確定していない部分をランダムな文字で埋める
      if (currentIndexRef.current < text.length) {
        // 次の1文字をランダム表示
        tempText += CHARS[Math.floor(Math.random() * CHARS.length)];

        // 残りの部分もランダム表示（演出強化のため少し長めに見せる）
        const remaining = text.length - currentIndexRef.current - 1;
        for (let i = 0; i < Math.max(remaining, 2); i++) {
          tempText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(tempText);
      currentIndexRef.current++;

      // 全文字確定したら終了
      if (currentIndexRef.current >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayText(text); // 最終的な正しいテキストをセット
        setIsDecoding(false); // ★追加：完了したらフラグをfalseにする
      }
    }, speed);

    // クリーンアップ
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed]);

  return (
    /* ★修正：デコード中(isDecodingがtrue)の場合のみ、
       Tailwindの 'font-mono'（等幅フォント）クラスを適用する。
       tracking-tighter で少し文字間を詰めて、ガチャガチャ感を強調するのも良い演出です。
    */
    <span className={`${isDecoding ? 'font-mono tracking-tighter break-all' : ''} transition-all duration-200 inline-block`}>
      {displayText}
    </span>
  );
};

export default DecodingText;