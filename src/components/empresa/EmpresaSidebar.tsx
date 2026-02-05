 import { Link, useLocation } from 'react-router-dom';
 import {
   LayoutDashboard,
   Briefcase,
   Users,
   Building2,
   Settings,
   LogOut,
   ChevronLeft,
   Menu,
   Plus,
 } from 'lucide-react';
 import { cn } from '@/lib/utils';
 import { useState } from 'react';
 import { Button } from '@/components/ui/button';
 
 interface NavItem {
   label: string;
   href: string;
   icon: React.ElementType;
 }
 
 const navItems: NavItem[] = [
   { label: 'Dashboard', href: '/empresa/dashboard', icon: LayoutDashboard },
   { label: 'Minhas Vagas', href: '/empresa/vagas', icon: Briefcase },
   { label: 'Candidaturas', href: '/empresa/candidaturas', icon: Users },
   { label: 'Perfil da Empresa', href: '/empresa/perfil', icon: Building2 },
   { label: 'Configurações', href: '/empresa/configuracoes', icon: Settings },
 ];
 
 export function EmpresaSidebar() {
   const location = useLocation();
   const [collapsed, setCollapsed] = useState(false);
 
   const isActive = (href: string) => {
     if (href === '/empresa/dashboard') return location.pathname === '/empresa/dashboard';
     return location.pathname.startsWith(href);
   };
 
   return (
     <>
       {/* Mobile Header */}
       <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-4">
         <Link to="/empresa/dashboard" className="flex items-center gap-2">
           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
             <Building2 className="h-4 w-4 text-primary-foreground" />
           </div>
           <span className="font-bold text-foreground">Portal Empresa</span>
         </Link>
         <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
           <Menu className="h-5 w-5" />
         </Button>
       </div>
 
       {/* Sidebar */}
       <aside
         className={cn(
           "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
           collapsed ? "w-20" : "w-64",
           "hidden lg:block"
         )}
       >
         <div className="flex h-full flex-col">
           {/* Logo */}
           <div className="flex h-16 items-center justify-between border-b border-border px-4">
             {!collapsed && (
               <Link to="/empresa/dashboard" className="flex items-center gap-2">
                 <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                   <Building2 className="h-5 w-5 text-primary-foreground" />
                 </div>
                 <div className="flex flex-col">
                   <span className="font-bold text-foreground">Empresa</span>
                   <span className="text-[10px] text-muted-foreground">Portal</span>
                 </div>
               </Link>
             )}
             {collapsed && (
               <div className="flex h-9 w-9 mx-auto items-center justify-center rounded-xl bg-primary">
                 <Building2 className="h-5 w-5 text-primary-foreground" />
               </div>
             )}
             <Button
               variant="ghost"
               size="icon"
               className={cn("hidden lg:flex", collapsed && "mx-auto")}
               onClick={() => setCollapsed(!collapsed)}
             >
               <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
             </Button>
           </div>
 
           {/* New Job Button */}
           <div className="p-3">
             <Button asChild className={cn("w-full", collapsed && "px-2")}>
               <Link to="/empresa/vagas/nova">
                 <Plus className="h-4 w-4" />
                 {!collapsed && <span className="ml-2">Nova Vaga</span>}
               </Link>
             </Button>
           </div>
 
           {/* Navigation */}
           <nav className="flex-1 space-y-1 p-3">
             {navItems.map((item) => (
               <Link
                 key={item.href}
                 to={item.href}
                 className={cn(
                   "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                   isActive(item.href)
                     ? "bg-primary text-primary-foreground"
                     : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                   collapsed && "justify-center px-2"
                 )}
               >
                 <item.icon className="h-5 w-5 shrink-0" />
                 {!collapsed && <span>{item.label}</span>}
               </Link>
             ))}
           </nav>
 
           {/* Footer */}
           <div className="border-t border-border p-3">
             <Link
               to="/login"
               className={cn(
                 "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
                 collapsed && "justify-center px-2"
               )}
             >
               <LogOut className="h-5 w-5" />
               {!collapsed && <span>Terminar Sessão</span>}
             </Link>
           </div>
         </div>
       </aside>
     </>
   );
 }