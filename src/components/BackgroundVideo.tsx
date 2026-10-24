import { useRef } from 'react';
import { useVideoScrub } from '../hooks/useVideoScrub';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

/**
 * Full-screen scrubbed video.
 * The video's own first frame is black, so a bright frame is pinned as the
 * `poster` — the page never loads as a black screen, and the scrub still
 * starts from that frame. A gradient scrim sits on top so black type stays
 * legible over whatever the frame is doing.
 */
export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoScrub(videoRef);

  return (
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef}
        poster="/assets/video-poster.jpg"
        className="w-full h-full object-cover"
        style={{ objectPosition: '70% center' }}
        muted
        playsInline
        preload="auto"
        loop
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(250,249,247,0.55) 0%, rgba(250,249,247,0.15) 35%, rgba(250,249,247,0.45) 70%, rgba(250,249,247,0.85) 100%)',
        }}
      />
    </div>
  );
}