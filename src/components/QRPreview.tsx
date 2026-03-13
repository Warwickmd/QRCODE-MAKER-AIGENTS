import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QRStyle, CornerStyle, DotStyle } from '../types';

interface Props {
  data: string;
  style: QRStyle;
  label?: string;
}

function mapCornerSquare(cs: CornerStyle): 'square' | 'extra-rounded' | 'dot' {
  if (cs === 'rounded') return 'extra-rounded';
  if (cs === 'dots') return 'dot';
  return 'square';
}

function mapCornerDot(cs: CornerStyle): 'square' | 'dot' {
  if (cs === 'dots') return 'dot';
  return 'square';
}

function mapDotType(ds: DotStyle): 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded' {
  return ds;
}

export function QRPreview({ data, style, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    qrRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: data || ' ',
      image: style.logoUrl || undefined,
      dotsOptions: {
        color: style.foreground,
        type: mapDotType(style.dotStyle),
      },
      backgroundOptions: {
        color: style.background,
      },
      cornersSquareOptions: {
        color: style.cornerColor,
        type: mapCornerSquare(style.cornerStyle),
      },
      cornersDotOptions: {
        color: style.cornerColor,
        type: mapCornerDot(style.cornerStyle),
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 4,
        imageSize: style.logoSize / 100,
      },
      qrOptions: {
        errorCorrectionLevel: 'H',
      },
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      qrRef.current.append(containerRef.current);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!qrRef.current) return;
    qrRef.current.update({
      data: data || ' ',
      image: style.logoUrl || undefined,
      dotsOptions: {
        color: style.foreground,
        type: mapDotType(style.dotStyle),
      },
      backgroundOptions: {
        color: style.background,
      },
      cornersSquareOptions: {
        color: style.cornerColor,
        type: mapCornerSquare(style.cornerStyle),
      },
      cornersDotOptions: {
        color: style.cornerColor,
        type: mapCornerDot(style.cornerStyle),
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 4,
        imageSize: style.logoSize / 100,
      },
    });
  }, [data, style]);

  const downloadPNG = () => {
    qrRef.current?.download({ name: `aigents-qr-${label || 'code'}`, extension: 'png' });
  };

  const downloadSVG = () => {
    qrRef.current?.download({ name: `aigents-qr-${label || 'code'}`, extension: 'svg' });
  };

  return (
    <div className="flex flex-col items-center">
      {/* QR card */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-md border border-[#e2e8f0]"
        style={{ background: style.background, padding: '24px 24px 16px' }}
      >
        {/* QR canvas */}
        <div ref={containerRef} id="qr-canvas-container" className="rounded-xl overflow-hidden" />

        {/* Scan label */}
        {style.scanText && (
          <div className="mt-3 flex flex-col items-center gap-0.5">
            {style.showScanArrow && (
              <svg
                className="mb-1"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M8 28 C8 20, 16 10, 24 6"
                  stroke={style.scanTextColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M20 4 L26 8 L22 14"
                  stroke={style.scanTextColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            )}
            <span
              className="text-lg font-medium"
              style={{
                color: style.scanTextColor,
                fontFamily: '"Brush Script MT", cursive',
                fontSize: '22px',
              }}
            >
              {style.scanText}
            </span>
          </div>
        )}
      </div>

      {/* Download buttons */}
      {ready && (
        <div className="flex gap-2 mt-5 w-full">
          <button
            onClick={downloadPNG}
            className="
              flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
              bg-[#2563eb] text-white font-semibold text-sm
              hover:bg-[#1d4ed8] active:scale-95 transition-all
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            PNG
          </button>
          <button
            onClick={downloadSVG}
            className="
              flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
              border border-[#e2e8f0] bg-white text-[#1e3a5f] font-semibold text-sm
              hover:border-[#93c5fd] hover:text-[#1e40af] active:scale-95 transition-all
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            SVG
          </button>
        </div>
      )}
    </div>
  );
}
