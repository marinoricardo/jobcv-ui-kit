 import { AdminLayout } from '@/components/admin/AdminLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import {
   Briefcase,
   Building2,
   Users,
   FileText,
   TrendingUp,
   Eye,
   Clock,
   ArrowUpRight,
   Plus,
 } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { mockJobs, mockCompanies, mockApplications, blogPosts } from '@/data/mockJobs';
 
 export default function AdminDashboard() {
   const stats = [
     {
       title: 'Vagas Activas',
       value: mockJobs.filter((j) => j.status === 'active').length,
       change: '+12%',
       icon: Briefcase,
       color: 'text-primary',
       bgColor: 'bg-primary/10',
     },
     {
       title: 'Empresas',
       value: mockCompanies.length,
       change: '+5%',
       icon: Building2,
       color: 'text-blue-600',
       bgColor: 'bg-blue-100',
     },
     {
       title: 'Candidaturas',
       value: mockApplications.length,
       change: '+23%',
       icon: Users,
       color: 'text-green-600',
       bgColor: 'bg-green-100',
     },
     {
       title: 'Artigos',
       value: blogPosts.filter((b) => b.status === 'published').length,
       change: '+8%',
       icon: FileText,
       color: 'text-orange-600',
       bgColor: 'bg-orange-100',
     },
   ];
 
   const recentApplications = mockApplications.slice(0, 5);
   const recentJobs = mockJobs.slice(0, 5);
 
   return (
     <AdminLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
             <p className="text-muted-foreground">Visão geral da plataforma JobCV</p>
           </div>
           <div className="flex gap-3">
             <Button variant="outline" asChild>
               <Link to="/admin/blog/nova">
                 <Plus className="mr-2 h-4 w-4" />
                 Novo Artigo
               </Link>
             </Button>
             <Button asChild>
               <Link to="/admin/vagas/nova">
                 <Plus className="mr-2 h-4 w-4" />
                 Nova Vaga
               </Link>
             </Button>
           </div>
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
                 <div className="mt-3 flex items-center gap-1 text-sm">
                   <TrendingUp className="h-4 w-4 text-green-600" />
                   <span className="text-green-600 font-medium">{stat.change}</span>
                   <span className="text-muted-foreground">vs mês anterior</span>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
 
         {/* Content Grid */}
         <div className="grid gap-6 lg:grid-cols-2">
           {/* Recent Applications */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-lg">Candidaturas Recentes</CardTitle>
               <Button variant="ghost" size="sm" asChild>
                 <Link to="/admin/candidaturas">
                   Ver todas <ArrowUpRight className="ml-1 h-4 w-4" />
                 </Link>
               </Button>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {recentApplications.map((app) => (
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
                     <Badge
                       variant={
                         app.status === 'hired' ? 'default' :
                         app.status === 'shortlisted' ? 'secondary' :
                         app.status === 'rejected' ? 'destructive' : 'outline'
                       }
                     >
                       {app.status === 'pending' && 'Pendente'}
                       {app.status === 'reviewing' && 'Em análise'}
                       {app.status === 'shortlisted' && 'Pré-seleccionado'}
                       {app.status === 'rejected' && 'Rejeitado'}
                       {app.status === 'hired' && 'Contratado'}
                     </Badge>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
 
           {/* Recent Jobs */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-lg">Vagas Recentes</CardTitle>
               <Button variant="ghost" size="sm" asChild>
                 <Link to="/admin/vagas">
                   Ver todas <ArrowUpRight className="ml-1 h-4 w-4" />
                 </Link>
               </Button>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {recentJobs.map((job) => (
                   <div key={job.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                     <div className="flex items-center gap-3">
                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                         <Briefcase className="h-5 w-5 text-primary" />
                       </div>
                       <div>
                         <p className="font-medium text-foreground">{job.title}</p>
                         <p className="text-sm text-muted-foreground">{job.company}</p>
                       </div>
                     </div>
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
                 ))}
               </div>
             </CardContent>
           </Card>
         </div>
       </div>
     </AdminLayout>
   );
 }