 import { ReactNode } from 'react';
 import { CandidatoSidebar } from './CandidatoSidebar';
 
 interface CandidatoLayoutProps {
   children: ReactNode;
 }
 
 export function CandidatoLayout({ children }: CandidatoLayoutProps) {
   return (
     <div className="min-h-screen bg-background">
       <CandidatoSidebar />
       <main className="lg:pl-64 pt-16 lg:pt-0">
         <div className="min-h-screen">
           {children}
         </div>
       </main>
     </div>
   );
 }