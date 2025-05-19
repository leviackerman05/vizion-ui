
import { HEADER } from "@/constants/strings";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useState } from "react";
import ExportModal from "@/components/modals/ExportModal";

const Header = () => {
  const [exportModalOpen, setExportModalOpen] = useState(false);
  
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          {HEADER.NEW_PROJECT}
        </Button>
        
        <Button variant="ghost" size="sm">
          {HEADER.SAVE}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExportModalOpen(true)}
        >
          {HEADER.EXPORT}
        </Button>
      </div>
      
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Settings size={18} />
        </Button>
      </div>

      <ExportModal 
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />
    </header>
  );
};

export default Header;
