
import { HEADER } from "@/constants/strings";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          {HEADER.NEW_PROJECT}
        </Button>
        
        <Button variant="ghost" size="sm">
          {HEADER.SAVE}
        </Button>
        
        <Button variant="ghost" size="sm">
          {HEADER.EXPORT}
        </Button>
      </div>
      
      <div>
        <Button variant="ghost" size="icon">
          <Settings size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
