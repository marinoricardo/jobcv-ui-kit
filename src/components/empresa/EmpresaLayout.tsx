 import { ReactNode } from 'react';
 import { EmpresaSidebar } from './EmpresaSidebar';
 
 interface EmpresaLayoutProps {
   children: ReactNode;
 }
 
 export function EmpresaLayout({ children }: EmpresaLayoutProps) {
   return (
     <div className="min-h-screen bg-background">
       <EmpresaSidebar />
       <main className="lg:pl-64 pt-16 lg:pt-0">
         <div className="min-h-screen">
           {children}
         </div>
       </main>
     </div>
   );
 }