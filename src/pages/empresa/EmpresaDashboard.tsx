 import { EmpresaLayout } from '@/components/empresa/EmpresaLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import {
   Briefcase,
   Users,
   Eye,
   TrendingUp,
   ArrowUpRight,
   Plus,
   Clock,
 } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { mockJobs, mockApplications } from '@/data/mockJobs';
 
 export default function EmpresaDashboard() {
   // Filter for this company's jobs (mock: Vodacom)
   const companyJobs = mockJobs.filter((j) => j.company === 'Vodacom Moçambique');
   const companyApplications = mockApplications.filter((a) => a.company === 'Vodacom Moçambique');
 
   const stats = [
     {
       title: 'Vagas Activas',
       value: companyJobs.filter((j) => j.status === 'active').length,
       icon: Briefcase,
       color: 'text-primary',
       bgColor: 'bg-primary/10',
     },
     {
       title: 'Total Candidaturas',
       value: companyApplications.length,
       icon: Users,
       color: 'text-emerald-600',
       bgColor: 'bg-emerald-100',
     },
     {
       title: 'Visualizações',
       value: companyJobs.reduce((acc, j) => acc + (j.views || 0), 0),
       icon: Eye,
       color: 'text-blue-600',
       bgColor: 'bg-blue-100',
     },
     {
       title: 'Taxa de Conversão',
       value: '5.2%',
       icon: TrendingUp,
       color: 'text-orange-600',
       bgColor: 'bg-orange-100',
     },
   ];
 
   return (
     <EmpresaLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
             <p className="text-muted-foreground">Bem-vindo, Vodacom Moçambique</p>
           </div>
           <Button asChild>
             <Link to="/empresa/vagas/nova">
               <Plus className="mr-2 h-4 w-4" />
               Publicar Vaga
             </Link>
           </Button>
         </div>
 
         {/* Stats Grid */}
         <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
           {stats.map((stat) => (
             <Card key={stat.title}>
               <CardContent className="p-6">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-sm text-muted-foreground">{stat.title}</p>
                     <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                   </div>
                   <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                     <stat.icon className={`h-6 w-6 ${stat.color}`} />
                   </div>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
 
         {/* Content Grid */}
         <div className="grid gap-6 lg:grid-cols-2">
           {/* My Jobs */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-lg">Minhas Vagas</CardTitle>
               <Button variant="ghost" size="sm" asChild>
                 <Link to="/empresa/vagas">
                   Ver todas <ArrowUpRight className="ml-1 h-4 w-4" />
                 </Link>
               </Button>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {companyJobs.slice(0, 3).map((job) => (
                   <div key={job.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                     <div>
                       <p className="font-medium text-foreground">{job.title}</p>
                       <div className="flex items-center gap-2 mt-1">
                         <Badge variant={job.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                           {job.status === 'active' ? 'Activa' : 'Pausada'}
                         </Badge>
                         <span className="text-xs text-muted-foreground">{job.location}</span>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="flex items-center gap-3 text-sm text-muted-foreground">
                         <span className="flex items-center gap-1">
                           <Eye className="h-4 w-4" />
                           {job.views || 0}
                         </span>
                         <span className="flex items-center gap-1">
                           <Users className="h-4 w-4" />
                           {job.applications || 0}
                         </span>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
 
           {/* Recent Applications */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-lg">Candidaturas Recentes</CardTitle>
               <Button variant="ghost" size="sm" asChild>
                 <Link to="/empresa/candidaturas">
                   Ver todas <ArrowUpRight className="ml-1 h-4 w-4" />
                 </Link>
               </Button>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {companyApplications.slice(0, 4).map((app) => (
                   <div key={app.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                     <div className="flex items-center gap-3">
                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                         <Users className="h-5 w-5 text-muted-foreground" />
                       </div>
                       <div>
                         <p className="font-medium text-foreground">{app.candidateName}</p>
                         <p className="text-sm text-muted-foreground">{app.jobTitle}</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-2">
                       <Badge
                         variant={
                           app.status === 'shortlisted' ? 'default' :
                           app.status === 'reviewing' ? 'secondary' : 'outline'
                         }
                       >
                         {app.status === 'pending' && 'Pendente'}
                         {app.status === 'reviewing' && 'Em análise'}
                         {app.status === 'shortlisted' && 'Pré-seleccionado'}
                       </Badge>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </div>
       </div>
     </EmpresaLayout>
   );
 }