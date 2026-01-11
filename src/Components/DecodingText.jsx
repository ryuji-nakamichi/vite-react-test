import React, { useState, useEffect } from 'react';

const DecodingText = ({ text, speed = 40 }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/?!@#$%^&*()';

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    // テキストの長さ分、最初はランダム文字で埋める
    setDisplayText(
      text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
    );

    interval = setInterval(() => {
      setDisplayText(prev =>
        text.split('').map((char, index) => {
          if (index < iteration) {
            return text[index]; // 解析完了した文字
          }
          return chars[Math.floor(Math.random() * chars.length)]; // 解析中のランダム文字
        }).join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // ここを調整すると解析スピードが変わります
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayText}</span>;
};

export default DecodingText;