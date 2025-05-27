
import { User, BadgeDollarSign, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfileSidebar = () => {
  return (
    <div className="w-full max-w-xs flex flex-col gap-4">
      <div className="flex flex-col items-center py-8">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
          <User size={64} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-medium">John Doe</h2>
        <p className="text-muted-foreground">john.doe@example.com</p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BadgeDollarSign size={18} className="text-primary" />
            Subscription
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Current Plan</span>
              <span className="font-medium">Free Tier</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Remaining Credits</span>
              <span className="font-medium">15/20</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Expires</span>
              <span className="font-medium">Never</span>
            </div>
            
            <Button className="w-full gap-2">
              <BadgeCheck size={16} />
              Upgrade to Pro
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
