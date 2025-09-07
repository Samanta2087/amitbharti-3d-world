import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Users, 
  MessageSquare, 
  Settings,
  BarChart3,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FileText, label: 'Blog Posts', href: '/admin/blogs' },
  { icon: Video, label: 'Videos', href: '/admin/videos' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <Home className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold gradient-text">Admin Panel</span>
        </Link>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-border/50">
          <p className="text-sm text-muted-foreground mb-2">Need help?</p>
          <Link 
            to="/contact" 
            className="text-sm text-primary hover:text-accent transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};