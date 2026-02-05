 import { ReactNode } from 'react';
 import { AdminSidebar } from './AdminSidebar';
 
 interface AdminLayoutProps {
   children: ReactNode;
 }
 
 export function AdminLayout({ children }: AdminLayoutProps) {
   return (
     <div className="min-h-screen bg-background">
       <AdminSidebar />
       <main className="lg:pl-64 pt-16 lg:pt-0">
         <div className="min-h-screen">
           {children}
         </div>
       </main>
     </div>
   );
 }