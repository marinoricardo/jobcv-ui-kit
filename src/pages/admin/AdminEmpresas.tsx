 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { AdminLayout } from '@/components/admin/AdminLayout';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
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
   Search,
   MoreHorizontal,
   Eye,
   Edit,
   Trash2,
   Building2,
   MapPin,
   Briefcase,
   CheckCircle2,
   Globe,
 } from 'lucide-react';
 import { mockCompanies } from '@/data/mockJobs';
 
 export default function AdminEmpresas() {
   const [search, setSearch] = useState('');
 
   const filteredCompanies = mockCompanies.filter((company) =>
     company.name.toLowerCase().includes(search.toLowerCase()) ||
     company.industry.toLowerCase().includes(search.toLowerCase())
   );
 
   return (
     <AdminLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Gestão de Empresas</h1>
             <p className="text-muted-foreground">{mockCompanies.length} empresas registadas</p>
           </div>
           <Button asChild>
             <Link to="/admin/empresas/nova">
               <Plus className="mr-2 h-4 w-4" />
               Nova Empresa
             </Link>
           </Button>
         </div>
 
         {/* Search */}
         <div className="mb-6">
           <div className="relative max-w-md">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input
               placeholder="Pesquisar empresas..."
               className="pl-10"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
         </div>
 
         {/* Companies Grid */}
         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
           {filteredCompanies.map((company) => (
             <Card key={company.id} className="group transition-shadow hover:shadow-md">
               <CardContent className="p-6">
                 <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-3">
                     <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                       <Building2 className="h-6 w-6 text-primary" />
                     </div>
                     <div>
                       <div className="flex items-center gap-2">
                         <h3 className="font-semibold text-foreground">{company.name}</h3>
                         {company.verified && (
                           <CheckCircle2 className="h-4 w-4 text-primary" />
                         )}
                       </div>
                       <p className="text-sm text-muted-foreground">{company.industry}</p>
                     </div>
                   </div>
                   <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                       <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                         <MoreHorizontal className="h-4 w-4" />
                       </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                       <DropdownMenuItem asChild>
                         <Link to={`/empresas/${company.slug}`}>
                           <Eye className="mr-2 h-4 w-4" />
                           Ver Perfil
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                         <Link to={`/admin/empresas/${company.id}/editar`}>
                           <Edit className="mr-2 h-4 w-4" />
                           Editar
                         </Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem className="text-destructive">
                         <Trash2 className="mr-2 h-4 w-4" />
                         Eliminar
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                   </DropdownMenu>
                 </div>
 
                 <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                   {company.description}
                 </p>
 
                 <div className="space-y-2 text-sm">
                   <div className="flex items-center gap-2 text-muted-foreground">
                     <MapPin className="h-4 w-4" />
                     {company.location}
                   </div>
                   {company.website && (
                     <div className="flex items-center gap-2 text-muted-foreground">
                       <Globe className="h-4 w-4" />
                       <a href={company.website} target="_blank" rel="noopener" className="hover:text-primary">
                         {company.website.replace('https://', '')}
                       </a>
                     </div>
                   )}
                 </div>
 
                 <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                   <Badge variant="secondary">
                     <Briefcase className="mr-1 h-3 w-3" />
                     {company.activeJobs || 0} vagas activas
                   </Badge>
                   <span className="text-xs text-muted-foreground">{company.employees} funcionários</span>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
       </div>
     </AdminLayout>
   );
 }