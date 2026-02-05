 import { CandidatoLayout } from '@/components/candidato/CandidatoLayout';
 import { Card, CardContent } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Button } from '@/components/ui/button';
 import {
   Building2,
   Clock,
   Eye,
   CheckCircle2,
   XCircle,
   MapPin,
   Calendar,
   ExternalLink,
 } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { mockApplications, mockJobs } from '@/data/mockJobs';
 
 export default function CandidatoCandidaturas() {
   // Mock data for candidate
   const myApplications = mockApplications.filter((a) => 
     a.candidateEmail === 'joao.sitoe@email.com' || 
     a.candidateName.includes('João')
   ).concat(mockApplications.slice(0, 2));
 
   const formatDate = (dateStr: string) => {
     return new Date(dateStr).toLocaleDateString('pt-MZ', {
       day: '2-digit',
       month: 'long',
       year: 'numeric',
     });
   };
 
   const getStatusConfig = (status: string) => {
     const configs: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ElementType; label: string }> = {
       pending: { variant: 'outline', icon: Clock, label: 'Pendente' },
       reviewing: { variant: 'secondary', icon: Eye, label: 'Em análise' },
       shortlisted: { variant: 'default', icon: CheckCircle2, label: 'Pré-seleccionado' },
       rejected: { variant: 'destructive', icon: XCircle, label: 'Rejeitado' },
       hired: { variant: 'default', icon: CheckCircle2, label: 'Contratado' },
     };
     return configs[status] || configs.pending;
   };
 
   return (
     <CandidatoLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-6">
           <h1 className="text-2xl font-bold text-foreground">Minhas Candidaturas</h1>
           <p className="text-muted-foreground">{myApplications.length} candidaturas enviadas</p>
         </div>
 
         {/* Status Summary */}
         <div className="mb-6 grid gap-3 grid-cols-2 sm:grid-cols-4">
           <Card>
             <CardContent className="p-4 text-center">
               <p className="text-2xl font-bold text-foreground">
                 {myApplications.filter((a) => a.status === 'pending').length}
               </p>
               <p className="text-sm text-muted-foreground">Pendentes</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4 text-center">
               <p className="text-2xl font-bold text-foreground">
                 {myApplications.filter((a) => a.status === 'reviewing').length}
               </p>
               <p className="text-sm text-muted-foreground">Em análise</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4 text-center">
               <p className="text-2xl font-bold text-primary">
                 {myApplications.filter((a) => a.status === 'shortlisted').length}
               </p>
               <p className="text-sm text-muted-foreground">Pré-seleccionadas</p>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4 text-center">
               <p className="text-2xl font-bold text-muted-foreground">
                 {myApplications.filter((a) => a.status === 'rejected').length}
               </p>
               <p className="text-sm text-muted-foreground">Rejeitadas</p>
             </CardContent>
           </Card>
         </div>
 
         {/* Applications List */}
         <div className="space-y-4">
           {myApplications.map((app) => {
             const statusConfig = getStatusConfig(app.status);
             const job = mockJobs.find((j) => j.id === app.jobId);
             
             return (
               <Card key={app.id}>
                 <CardContent className="p-6">
                   <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                     <div className="flex gap-4">
                       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                         <Building2 className="h-6 w-6 text-primary" />
                       </div>
                       <div>
                         <h3 className="font-semibold text-foreground">{app.jobTitle}</h3>
                         <p className="text-muted-foreground">{app.company}</p>
                         <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                           {job && (
                             <span className="flex items-center gap-1">
                               <MapPin className="h-4 w-4" />
                               {job.location}
                             </span>
                           )}
                           <span className="flex items-center gap-1">
                             <Calendar className="h-4 w-4" />
                             Candidatou-se em {formatDate(app.appliedAt)}
                           </span>
                         </div>
                       </div>
                     </div>
 
                     <div className="flex items-center gap-3">
                       <Badge variant={statusConfig.variant} className="gap-1">
                         <statusConfig.icon className="h-3 w-3" />
                         {statusConfig.label}
                       </Badge>
                       {job && (
                         <Button variant="outline" size="sm" asChild>
                           <Link to={`/vaga/${job.slug}`}>
                             <ExternalLink className="h-4 w-4 mr-1" />
                             Ver Vaga
                           </Link>
                         </Button>
                       )}
                     </div>
                   </div>
                 </CardContent>
               </Card>
             );
           })}
         </div>
       </div>
     </CandidatoLayout>
   );
 }