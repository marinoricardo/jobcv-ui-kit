 import { useState } from 'react';
 import { Link } from 'react-router-dom';
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
   DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu';
 import {
   Plus,
   Search,
   MoreHorizontal,
   Eye,
   Edit,
   Trash2,
   Pause,
   Play,
   Users,
 } from 'lucide-react';
 import { mockJobs } from '@/data/mockJobs';
 
 export default function AdminVagas() {
   const [search, setSearch] = useState('');
   const [statusFilter, setStatusFilter] = useState<string>('all');
 
   const filteredJobs = mockJobs.filter((job) => {
     const matchesSearch =
       job.title.toLowerCase().includes(search.toLowerCase()) ||
       job.company.toLowerCase().includes(search.toLowerCase());
     const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
     return matchesSearch && matchesStatus;
   });
 
   const formatDate = (dateStr: string) => {
     return new Date(dateStr).toLocaleDateString('pt-MZ', {
       day: '2-digit',
       month: 'short',
       year: 'numeric',
     });
   };
 
   return (
     <AdminLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Gestão de Vagas</h1>
             <p className="text-muted-foreground">{mockJobs.length} vagas no total</p>
           </div>
           <Button asChild>
             <Link to="/admin/vagas/nova">
               <Plus className="mr-2 h-4 w-4" />
               Nova Vaga
             </Link>
           </Button>
         </div>
 
         {/* Filters */}
         <div className="mb-6 flex flex-col gap-4 sm:flex-row">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input
               placeholder="Pesquisar vagas..."
               className="pl-10"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <div className="flex gap-2">
             <Button
               variant={statusFilter === 'all' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('all')}
             >
               Todas
             </Button>
             <Button
               variant={statusFilter === 'active' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('active')}
             >
               Activas
             </Button>
             <Button
               variant={statusFilter === 'paused' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('paused')}
             >
               Pausadas
             </Button>
             <Button
               variant={statusFilter === 'closed' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('closed')}
             >
               Fechadas
             </Button>
           </div>
         </div>
 
         {/* Table */}
         <div className="rounded-xl border border-border bg-card">
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Vaga</TableHead>
                 <TableHead>Empresa</TableHead>
                 <TableHead>Localização</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead className="text-center">Visualizações</TableHead>
                 <TableHead className="text-center">Candidaturas</TableHead>
                 <TableHead>Data</TableHead>
                 <TableHead className="w-[50px]"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {filteredJobs.map((job) => (
                 <TableRow key={job.id}>
                   <TableCell>
                     <div>
                       <p className="font-medium text-foreground">{job.title}</p>
                       <p className="text-sm text-muted-foreground">
                         {job.type === 'full-time' ? 'Tempo Integral' : 'Part-time'}
                         {job.isRemote && ' • Remoto'}
                       </p>
                     </div>
                   </TableCell>
                   <TableCell className="text-muted-foreground">{job.company}</TableCell>
                   <TableCell className="text-muted-foreground">{job.location}</TableCell>
                   <TableCell>
                     <Badge
                       variant={
                         job.status === 'active' ? 'default' :
                         job.status === 'paused' ? 'secondary' : 'outline'
                       }
                     >
                       {job.status === 'active' && 'Activa'}
                       {job.status === 'paused' && 'Pausada'}
                       {job.status === 'closed' && 'Fechada'}
                     </Badge>
                   </TableCell>
                   <TableCell className="text-center">
                     <div className="flex items-center justify-center gap-1 text-muted-foreground">
                       <Eye className="h-4 w-4" />
                       {job.views || 0}
                     </div>
                   </TableCell>
                   <TableCell className="text-center">
                     <div className="flex items-center justify-center gap-1 text-muted-foreground">
                       <Users className="h-4 w-4" />
                       {job.applications || 0}
                     </div>
                   </TableCell>
                   <TableCell className="text-muted-foreground">{formatDate(job.postedAt)}</TableCell>
                   <TableCell>
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
                             Ver
                           </Link>
                         </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                           <Link to={`/admin/vagas/${job.id}/editar`}>
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