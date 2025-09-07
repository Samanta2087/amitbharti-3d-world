import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const userSignups = [
  { name: 'Jan', users: 40 }, { name: 'Feb', users: 30 }, { name: 'Mar', users: 50 },
  { name: 'Apr', users: 45 }, { name: 'May', users: 60 }, { name: 'Jun', users: 70 },
];

const contentData = [ { name: 'Blog Posts', count: 12, fill: 'hsl(var(--primary))' }, { name: 'Videos', count: 25, fill: 'hsl(var(--accent))' }];

const AnalyticsPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Signups</CardTitle>
            <CardDescription>New user signups over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userSignups}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Content Breakdown</CardTitle>
            <CardDescription>Total number of posts and videos.</CardDescription>
          </CardHeader>
           <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;