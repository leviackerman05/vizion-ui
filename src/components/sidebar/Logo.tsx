
import { APP } from "@/constants/strings";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-6">
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
        <span className="text-white font-bold text-lg">V</span>
      </div>
      <h1 className="text-xl font-bold text-white">{APP.NAME}</h1>
    </div>
  );
};

export default Logo;
