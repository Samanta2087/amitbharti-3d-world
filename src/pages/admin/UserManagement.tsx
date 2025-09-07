import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Trash2, ShieldCheck, ShieldOff } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // Fetch profiles and their associated roles
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        user_id,
        display_name,
        avatar_url,
        last_seen,
        user_roles ( role )
      `);

    if (error) {
      toast.error('Failed to fetch users.');
      console.error(error);
    } else {
      // We need to fetch the email from the auth schema, as it's not in profiles
      const authUsersResponse = await supabase.auth.admin.listUsers();
      if (authUsersResponse.data.users) {
        const usersWithEmail = data.map(profile => {
            const authUser = authUsersResponse.data.users.find(u => u.id === profile.user_id);
            return {
                ...profile,
                email: authUser?.email || 'N/A'
            }
        });
        setUsers(usersWithEmail);
      } else {
        setUsers(data);
      }
    }
    setLoading(false);
  };
  
  const toggleAdminRole = async (userId: string, currentRoles: {role: string}[]) => {
      const isAdmin = currentRoles.some(r => r.role === 'admin');
      
      if (isAdmin) {
          // Remove admin role
          const { error } = await supabase.from('user_roles').delete().match({ user_id: userId, role: 'admin'});
          if(error) toast.error("Failed to remove admin role.");
          else toast.success("Admin role removed.");
      } else {
          // Add admin role
          const { error } = await supabase.from('user_roles').insert({ user_id: userId, role: 'admin' });
          if(error) toast.error("Failed to add admin role.");
          else toast.success("Admin role granted.");
      }
      fetchUsers(); // Refresh data
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar_url} />
                          <AvatarFallback>{user.display_name?.[0] || user.email?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.display_name || 'No Name'}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {user.user_roles.map((role: any, index: number) => (
                          <Badge key={index} variant={role.role === 'admin' ? 'default' : 'secondary'}>
                            {role.role}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.last_seen ? formatDistanceToNow(new Date(user.last_seen), { addSuffix: true }) : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                       <Button 
                         variant="ghost" 
                         size="sm"
                         onClick={() => toggleAdminRole(user.user_id, user.user_roles)}
                       >
                         {user.user_roles.some((r: any) => r.role === 'admin') 
                           ? <ShieldOff className="h-4 w-4 mr-2 text-destructive"/> 
                           : <ShieldCheck className="h-4 w-4 mr-2 text-success"/>
                         }
                         {user.user_roles.some((r: any) => r.role === 'admin') ? 'Remove Admin' : 'Make Admin'}
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default UserManagement;

