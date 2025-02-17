import { RefObject, useEffect } from 'react';

import { motion } from 'framer-motion';

import { CANVAS_SIZE } from '@/common/constants/canvasSize';
import { useBackground } from '@/common/recoil/background';

import { useBoardPosition } from '../hooks/useBoardPosition';

const Background = ({ bgRef }: { bgRef: RefObject<HTMLCanvasElement> }) => {
  const bg = useBackground();
  const { x, y } = useBoardPosition();
  const customsMap = '/customs.png';
  const factoryMap = '/factory.png';
  const interchangeMap ='/interchange.jpeg';

  let mapImage = ``;
  if (bg.mode === 'customs') {
    mapImage = `url(${customsMap})`;
  } else if (bg.mode === 'factory') {
    mapImage = `url('${factoryMap}')`;
  } else {
    mapImage = `url('${interchangeMap}')`;
  }

  useEffect(() => {
    const ctx = bgRef.current?.getContext('2d');

    if (ctx) {
      // ctx.fillStyle = '#222';
      // ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

      // document.body.style.backgroundColor = '#222';

      if (bg.mode === 'customs') {
        mapImage = `url(${customsMap})`;
      } else if (bg.mode === 'factory') {
        mapImage = `url('${factoryMap}')`;
      } else {
        mapImage = `url('${interchangeMap}')`;
      }

      if (bg.lines) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#444';
        for (let i = 0; i < CANVAS_SIZE.height; i += 25) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(ctx.canvas.width, i);
          ctx.stroke();
        }

        for (let i = 0; i < CANVAS_SIZE.width; i += 25) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, ctx.canvas.height);
          ctx.stroke();
        }
      }
    }
  }, [bgRef, bg]);

  return (
    <motion.canvas
      ref={bgRef}
      width={CANVAS_SIZE.width}
      height={CANVAS_SIZE.height}
      className="absolute top-0 bg-zinc-100"
      style={{ x, y, background: `${mapImage}` }}
    />
  );
};

export default Background;
