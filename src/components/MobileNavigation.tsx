import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Heart, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Vagas', href: '/', icon: Briefcase },
  { label: 'Guardadas', href: '/candidato/guardadas', icon: Heart },
  { label: 'Alertas', href: '/candidato/alertas', icon: Bell },
  { label: 'Perfil', href: '/candidato/dashboard', icon: User },
];

export function MobileNavigation() {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg md:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-xl transition-all',
                  active && 'bg-primary/10'
                )}
              >
                <item.icon className={cn('h-5 w-5', active && 'scale-110')} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
