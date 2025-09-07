import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const SettingsPage = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully! (Demo)");
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Website Settings</CardTitle>
          <CardDescription>Manage general settings for your website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input id="siteTitle" defaultValue="Amit Bharti - 3D World" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input id="siteDescription" defaultValue="Educational Content and More" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                        Temporarily disable public access to the site.
                    </p>
                </div>
                <Switch />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default SettingsPage;