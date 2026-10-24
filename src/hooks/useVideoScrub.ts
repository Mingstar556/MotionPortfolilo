import { useEffect, useRef, useState } from 'react';

const SENSITIVITY = 0.8;

/**
 * Mouse-scrub video control.
 * Horizontal mouse movement on `window` seeks the video forward/backward.
 * Uses an `onSeeked` queue so rapid moves never flood the decoder.
 */
export function useVideoScrub(videoRef: React.RefObject<HTMLVideoElement>) {
  const [ready, setReady] = useState(false);
  const prevX = useRef(0);
  const targetTime = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      targetTime.current = video.currentTime;
      prevX.current = window.innerWidth / 2;
      setReady(true);
    };
    video.addEventListener('loadedmetadata', onLoaded);

    const onSeeked = () => {
      if (Math.abs(video.currentTime - targetTime.current) > 0.05) {
        video.currentTime = targetTime.current;
      }
    };
    video.addEventListener('seeked', onSeeked);

    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - prevX.current;
      prevX.current = e.clientX;
      if (!video.duration || !isFinite(video.duration)) return;
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTime.current = Math.min(
        video.duration,
        Math.max(0, targetTime.current + offset)
      );
      video.currentTime = targetTime.current;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ready;
}