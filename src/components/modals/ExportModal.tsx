
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BadgeCheck } from "lucide-react";

type ExportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ExportModal = ({ open, onOpenChange }: ExportModalProps) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onOpenChange(false);
    navigate("/profile");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upgrade to Export</DialogTitle>
          <DialogDescription>
            Video exporting is available in our Pro tier. Upgrade now to unlock
            this feature and many more.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-2">
            <BadgeCheck size={18} className="text-primary" />
            <span>Unlimited video exports</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck size={18} className="text-primary" />
            <span>Higher resolution videos</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck size={18} className="text-primary" />
            <span>Priority generation queue</span>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between items-center sm:justify-between">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpgrade} className="gap-2">
            <BadgeCheck size={16} />
            Upgrade to Pro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
