import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import { initialisePayment } from "@/lib/api/payments";

const ProfileContent = () => {
  return (
    <div className="flex-1 p-6">
      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Subscription Plans</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 border-2 border-primary">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-medium mb-2">Pro Plan</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect for professionals and teams
                </p>

                <div className="mb-4">
                  <span className="text-3xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <BadgeCheck size={18} className="text-primary mt-0.5" />
                    <span>Unlimited video exports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck size={18} className="text-primary mt-0.5" />
                    <span>HD video quality (1080p)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck size={18} className="text-primary mt-0.5" />
                    <span>Priority generation queue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck size={18} className="text-primary mt-0.5" />
                    <span>Custom branding options</span>
                  </li>
                </ul>

                <Button
                  className="w-full gap-2 mt-auto"
                  onClick={async () => {
                    await initialisePayment();
                  }}
                >
                  <BadgeCheck size={16} />
                  Subscribe Now
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-medium mb-2">Enterprise</h3>
                <p className="text-muted-foreground mb-4">
                  For larger organizations with advanced needs
                </p>

                <div className="mb-4">
                  <span className="text-3xl font-bold">Custom</span>
                  <span className="text-muted-foreground"></span>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <BadgeCheck size={18} className="text-primary mt-0.5" />
                    <span>Everything in Pro plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck size={18} className="text-primary mt-0.5" />
                    <span>4K video exports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck size={18} className="text-primary mt-0.5" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck size={18} className="text-primary mt-0.5" />
                    <span>API access</span>
                  </li>
                </ul>

                <Button variant="outline" className="w-full gap-2 mt-auto">
                  Contact Sales
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="h-[400px] flex items-center justify-center border rounded-md">
            <p className="text-muted-foreground">
              Billing information and history will appear here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="h-[400px] flex items-center justify-center border rounded-md">
            <p className="text-muted-foreground">
              Account settings will appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileContent;
