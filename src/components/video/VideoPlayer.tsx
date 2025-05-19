
import { VIDEO } from "@/constants/strings";
import { VideoMetadata } from "@/types";

type VideoPlayerProps = {
  videoSrc?: string;
  metadata: VideoMetadata;
};

const VideoPlayer = ({ videoSrc, metadata }: VideoPlayerProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative bg-black rounded-lg overflow-hidden">
        {videoSrc ? (
          <video 
            src={videoSrc} 
            controls 
            autoPlay 
            className="absolute inset-0 w-full h-full object-contain"
          ></video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/50">
            Video will appear here
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{VIDEO.PREVIEW}</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{VIDEO.METADATA.DURATION}</span>
            <span className="text-sm font-medium">{metadata.duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{VIDEO.METADATA.RESOLUTION}</span>
            <span className="text-sm font-medium">{metadata.resolution}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{VIDEO.METADATA.FORMAT}</span>
            <span className="text-sm font-medium">{metadata.format}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{VIDEO.METADATA.SIZE}</span>
            <span className="text-sm font-medium">{metadata.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
