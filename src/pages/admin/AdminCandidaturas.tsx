 import { useState } from 'react';
 import { AdminLayout } from '@/components/admin/AdminLayout';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Badge } from '@/components/ui/badge';
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from '@/components/ui/table';
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu';
 import {
   Search,
   MoreHorizontal,
   Eye,
   Mail,
   Phone,
   FileText,
   Check,
   X,
   Clock,
   User,
 } from 'lucide-react';
 import { mockApplications } from '@/data/mockJobs';
 
 export default function AdminCandidaturas() {
   const [search, setSearch] = useState('');
   const [statusFilter, setStatusFilter] = useState<string>('all');
 
   const filteredApplications = mockApplications.filter((app) => {
     const matchesSearch =
       app.candidateName.toLowerCase().includes(search.toLowerCase()) ||
       app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
       app.company.toLowerCase().includes(search.toLowerCase());
     const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
     return matchesSearch && matchesStatus;
   });
 
   const formatDate = (dateStr: string) => {
     return new Date(dateStr).toLocaleDateString('pt-MZ', {
       day: '2-digit',
       month: 'short',
       year: 'numeric',
     });
   };
 
   const getStatusBadge = (status: string) => {
     const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
       pending: { variant: 'outline', label: 'Pendente' },
       reviewing: { variant: 'secondary', label: 'Em análise' },
       shortlisted: { variant: 'default', label: 'Pré-seleccionado' },
       rejected: { variant: 'destructive', label: 'Rejeitado' },
       hired: { variant: 'default', label: 'Contratado' },
     };
     const config = variants[status] || variants.pending;
     return <Badge variant={config.variant}>{config.label}</Badge>;
   };
 
   return (
     <AdminLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-6">
           <h1 className="text-2xl font-bold text-foreground">Gestão de Candidaturas</h1>
           <p className="text-muted-foreground">{mockApplications.length} candidaturas no total</p>
         </div>
 
         {/* Filters */}
         <div className="mb-6 flex flex-col gap-4 sm:flex-row">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input
               placeholder="Pesquisar candidaturas..."
               className="pl-10"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <div className="flex flex-wrap gap-2">
             <Button
               variant={statusFilter === 'all' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('all')}
             >
               Todas
             </Button>
             <Button
               variant={statusFilter === 'pending' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('pending')}
             >
               Pendentes
             </Button>
             <Button
               variant={statusFilter === 'reviewing' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('reviewing')}
             >
               Em análise
             </Button>
             <Button
               variant={statusFilter === 'shortlisted' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('shortlisted')}
             >
               Pré-seleccionados
             </Button>
             <Button
               variant={statusFilter === 'hired' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('hired')}
             >
               Contratados
             </Button>
           </div>
         </div>
 
         {/* Table */}
         <div className="rounded-xl border border-border bg-card">
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Candidato</TableHead>
                 <TableHead>Vaga</TableHead>
                 <TableHead>Empresa</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead>Data</TableHead>
                 <TableHead className="w-[50px]"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {filteredApplications.map((app) => (
                 <TableRow key={app.id}>
                   <TableCell>
                     <div className="flex items-center gap-3">
                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                         <User className="h-5 w-5 text-muted-foreground" />
                       </div>
                       <div>
                         <p className="font-medium text-foreground">{app.candidateName}</p>
                         <p className="text-sm text-muted-foreground">{app.candidateEmail}</p>
                       </div>
                     </div>
                   </TableCell>
                   <TableCell className="font-medium text-foreground">{app.jobTitle}</TableCell>
                   <TableCell className="text-muted-foreground">{app.company}</TableCell>
                   <TableCell>{getStatusBadge(app.status)}</TableCell>
                   <TableCell className="text-muted-foreground">{formatDate(app.appliedAt)}</TableCell>
                   <TableCell>
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon">
                           <MoreHorizontal className="h-4 w-4" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuItem>
                           <Eye className="mr-2 h-4 w-4" />
                           Ver Detalhes
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                           <FileText className="mr-2 h-4 w-4" />
                           Ver CV
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                           <Mail className="mr-2 h-4 w-4" />
                           Enviar Email
                         </DropdownMenuItem>
                         {app.candidatePhone && (
                           <DropdownMenuItem>
                             <Phone className="mr-2 h-4 w-4" />
                             Ligar
                           </DropdownMenuItem>
                         )}
                         <DropdownMenuSeparator />
                         <DropdownMenuItem>
                           <Clock className="mr-2 h-4 w-4" />
                           Marcar como Em análise
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                           <Check className="mr-2 h-4 w-4" />
                           Pré-seleccionar
                         </DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive">
                           <X className="mr-2 h-4 w-4" />
                           Rejeitar
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </div>
       </div>
     </AdminLayout>
   );
 }