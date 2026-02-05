 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { EmpresaLayout } from '@/components/empresa/EmpresaLayout';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Card, CardContent } from '@/components/ui/card';
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu';
 import {
   Plus,
   MoreHorizontal,
   Eye,
   Edit,
   Trash2,
   Pause,
   Play,
   Users,
   MapPin,
   Clock,
 } from 'lucide-react';
 import { mockJobs } from '@/data/mockJobs';
 
 export default function EmpresaVagas() {
   const companyJobs = mockJobs.filter((j) => j.company === 'Vodacom Moçambique');
 
   const formatDate = (dateStr: string) => {
     return new Date(dateStr).toLocaleDateString('pt-MZ', {
       day: '2-digit',
       month: 'short',
       year: 'numeric',
     });
   };
 
   return (
     <EmpresaLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Minhas Vagas</h1>
             <p className="text-muted-foreground">{companyJobs.length} vagas publicadas</p>
           </div>
           <Button asChild>
             <Link to="/empresa/vagas/nova">
               <Plus className="mr-2 h-4 w-4" />
               Nova Vaga
             </Link>
           </Button>
         </div>
 
         {/* Jobs List */}
         <div className="space-y-4">
           {companyJobs.map((job) => (
             <Card key={job.id} className="group">
               <CardContent className="p-6">
                 <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                   <div className="flex-1">
                     <div className="flex items-start gap-3">
                       <div>
                         <div className="flex items-center gap-2 mb-1">
                           <h3 className="font-semibold text-foreground">{job.title}</h3>
                           <Badge variant={job.status === 'active' ? 'default' : job.status === 'paused' ? 'secondary' : 'outline'}>
                             {job.status === 'active' && 'Activa'}
                             {job.status === 'paused' && 'Pausada'}
                             {job.status === 'closed' && 'Fechada'}
                           </Badge>
                         </div>
                         <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                           <span className="flex items-center gap-1">
                             <MapPin className="h-4 w-4" />
                             {job.location}
                           </span>
                           <span className="flex items-center gap-1">
                             <Clock className="h-4 w-4" />
                             {formatDate(job.postedAt)}
                           </span>
                           <span>{job.type === 'full-time' ? 'Tempo Integral' : 'Part-time'}</span>
                           {job.isRemote && <Badge variant="remote">Remoto</Badge>}
                         </div>
                       </div>
                     </div>
                   </div>
 
                   <div className="flex items-center gap-4">
                     <div className="flex items-center gap-4 text-sm">
                       <div className="text-center">
                         <p className="font-semibold text-foreground">{job.views || 0}</p>
                         <p className="text-xs text-muted-foreground flex items-center gap-1">
                           <Eye className="h-3 w-3" /> Views
                         </p>
                       </div>
                       <div className="text-center">
                         <p className="font-semibold text-foreground">{job.applications || 0}</p>
                         <p className="text-xs text-muted-foreground flex items-center gap-1">
                           <Users className="h-3 w-3" /> Candidatos
                         </p>
                       </div>
                     </div>
 
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon">
                           <MoreHorizontal className="h-4 w-4" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuItem asChild>
                           <Link to={`/vaga/${job.slug}`}>
                             <Eye className="mr-2 h-4 w-4" />
                             Ver Vaga
                           </Link>
                         </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                           <Link to={`/empresa/vagas/${job.id}/editar`}>
                             <Edit className="mr-2 h-4 w-4" />
                             Editar
                           </Link>
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                           {job.status === 'active' ? (
                             <>
                               <Pause className="mr-2 h-4 w-4" />
                               Pausar
                             </>
                           ) : (
                             <>
                               <Play className="mr-2 h-4 w-4" />
                               Activar
                             </>
                           )}
                         </DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive">
                           <Trash2 className="mr-2 h-4 w-4" />
                           Eliminar
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </div>
                 </div>
               </CardContent>
             </Card>
           ))}
 
           {companyJobs.length === 0 && (
             <Card>
               <CardContent className="py-12 text-center">
                 <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                   <Plus className="h-6 w-6 text-muted-foreground" />
                 </div>
                 <h3 className="mb-2 font-semibold text-foreground">Nenhuma vaga publicada</h3>
                 <p className="mb-4 text-muted-foreground">Comece a atrair talentos publicando sua primeira vaga.</p>
                 <Button asChild>
                   <Link to="/empresa/vagas/nova">Publicar Vaga</Link>
                 </Button>
               </CardContent>
             </Card>
           )}
         </div>
       </div>
     </EmpresaLayout>
   );
 }