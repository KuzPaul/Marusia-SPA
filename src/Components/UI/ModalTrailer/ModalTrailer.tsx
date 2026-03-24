import React, { useEffect } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";
import "./ModalTrailer.scss";

interface TrailerModalProps {
  open: boolean;
  onClose: () => void;
  videoId: string | undefined | null;
}

const ModalTrailer: React.FC<TrailerModalProps> = ({
  open,
  onClose,
  videoId,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const opts: YouTubeProps["opts"] = {
    height: "480",
    width: "100%",
    playerVars: {
      autoplay: 1,
      origin: window.location.origin,
      modestbranding: 1,
      rel: 0,
      controls: 1,
    },
  };

  const onError: YouTubeProps["onError"] = (error) => {
    console.error("YouTube player error:", error);
  };

  if (!open || !videoId) return null;

  return (
    <div className="trailer-modal" onClick={onClose}>
      <div
        className="trailer-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <YouTube videoId={videoId} opts={opts} onError={onError} />
        <button className="trailer-modal__close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default ModalTrailer;
