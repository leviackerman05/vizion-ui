
import { VideoMetadata, VideoState } from "@/types";
import VideoLoading from "./VideoLoading";
import VideoPlayer from "./VideoPlayer";

type VideoPanelProps = {
  videoState: VideoState;
  videoSrc?: string;
  metadata: VideoMetadata | null;
};

const VideoPanel = ({ videoState, videoSrc, metadata }: VideoPanelProps) => {
  if (videoState === "idle") {
    return null;
  }

  if (videoState === "generating") {
    return <VideoLoading />;
  }

  if (videoState === "ready" && metadata) {
    return <VideoPlayer videoSrc={videoSrc} metadata={metadata} />;
  }

  return null;
};

export default VideoPanel;
