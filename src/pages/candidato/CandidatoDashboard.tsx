 import { CandidatoLayout } from '@/components/candidato/CandidatoLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Progress } from '@/components/ui/progress';
 import {
   FileText,
   Heart,
   Eye,
   Bell,
   ArrowUpRight,
   Briefcase,
   CheckCircle2,
   Clock,
   XCircle,
   Building2,
 } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { mockApplications, mockJobs } from '@/data/mockJobs';
 
 export default function CandidatoDashboard() {
   // Mock data for candidate (João Manuel Sitoe)
   const myApplications = mockApplications.filter((a) => a.candidateEmail === 'joao.sitoe@email.com');
   const savedJobs = mockJobs.slice(0, 3);
 
   const stats = [
     {
       title: 'Candidaturas',
       value: myApplications.length,
       icon: FileText,
       color: 'text-primary',
       bgColor: 'bg-primary/10',
     },
     {
       title: 'Vagas Guardadas',
       value: savedJobs.length,
       icon: Heart,
       color: 'text-rose-600',
       bgColor: 'bg-rose-100',
     },
     {
       title: 'Perfil Visto',
       value: 24,
       icon: Eye,
       color: 'text-blue-600',
       bgColor: 'bg-blue-100',
     },
     {
       title: 'Alertas Activos',
       value: 2,
       icon: Bell,
       color: 'text-orange-600',
       bgColor: 'bg-orange-100',
     },
   ];
 
   const profileCompletion = 75;
 
   return (
     <CandidatoLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-8">
           <h1 className="text-2xl font-bold text-foreground">Olá, João 👋</h1>
           <p className="text-muted-foreground">Acompanhe as suas candidaturas e oportunidades</p>
         </div>
 
         {/* Profile Completion Card */}
         <Card className="mb-8 bg-gradient-to-r from-primary/10 via-accent to-primary/5">
           <CardContent className="p-6">
             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
               <div className="flex-1">
                 <h3 className="font-semibold text-foreground mb-1">Complete o seu perfil</h3>
                 <p className="text-sm text-muted-foreground mb-3">
                   Perfis completos têm 3x mais chances de serem vistos pelas empresas
                 </p>
                 <div className="flex items-center gap-3">
                   <Progress value={profileCompletion} className="flex-1 h-2" />
                   <span className="text-sm font-medium text-foreground">{profileCompletion}%</span>
                 </div>
               </div>
               <Button asChild>
                 <Link to="/candidato/perfil">Completar Perfil</Link>
               </Button>
             </div>
           </CardContent>
         </Card>
 
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
           {/* My Applications */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-lg">Minhas Candidaturas</CardTitle>
               <Button variant="ghost" size="sm" asChild>
                 <Link to="/candidato/candidaturas">
                   Ver todas <ArrowUpRight className="ml-1 h-4 w-4" />
                 </Link>
               </Button>
             </CardHeader>
             <CardContent>
               {myApplications.length > 0 ? (
                 <div className="space-y-4">
                   {myApplications.map((app) => (
                     <div key={app.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                       <div className="flex items-center gap-3">
                         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                           <Building2 className="h-5 w-5 text-primary" />
                         </div>
                         <div>
                           <p className="font-medium text-foreground">{app.jobTitle}</p>
                           <p className="text-sm text-muted-foreground">{app.company}</p>
                         </div>
                       </div>
                       <Badge
                         variant={
                           app.status === 'shortlisted' ? 'default' :
                           app.status === 'reviewing' ? 'secondary' :
                           app.status === 'rejected' ? 'destructive' : 'outline'
                         }
                       >
                         <span className="flex items-center gap-1">
                           {app.status === 'pending' && <Clock className="h-3 w-3" />}
                           {app.status === 'reviewing' && <Eye className="h-3 w-3" />}
                           {app.status === 'shortlisted' && <CheckCircle2 className="h-3 w-3" />}
                           {app.status === 'rejected' && <XCircle className="h-3 w-3" />}
                           {app.status === 'pending' && 'Pendente'}
                           {app.status === 'reviewing' && 'Em análise'}
                           {app.status === 'shortlisted' && 'Pré-seleccionado'}
                           {app.status === 'rejected' && 'Rejeitado'}
                         </span>
                       </Badge>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="py-8 text-center">
                   <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                   <p className="text-muted-foreground">Ainda não tem candidaturas</p>
                   <Button variant="outline" className="mt-4" asChild>
                     <Link to="/">Explorar Vagas</Link>
                   </Button>
                 </div>
               )}
             </CardContent>
           </Card>
 
           {/* Saved Jobs */}
           <Card>
             <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-lg">Vagas Guardadas</CardTitle>
               <Button variant="ghost" size="sm" asChild>
                 <Link to="/candidato/guardadas">
                   Ver todas <ArrowUpRight className="ml-1 h-4 w-4" />
                 </Link>
               </Button>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {savedJobs.map((job) => (
                   <Link
                     key={job.id}
                     to={`/vaga/${job.slug}`}
                     className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0 group"
                   >
                     <div className="flex items-center gap-3">
                       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                         <Briefcase className="h-5 w-5 text-muted-foreground" />
                       </div>
                       <div>
                         <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                           {job.title}
                         </p>
                         <p className="text-sm text-muted-foreground">{job.company}</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-2">
                       {job.salary && (
                         <span className="text-xs text-muted-foreground hidden sm:block">{job.salary}</span>
                       )}
                       <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                     </div>
                   </Link>
                 ))}
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Recommended Jobs */}
         <Card className="mt-6">
           <CardHeader>
             <CardTitle className="text-lg">Vagas Recomendadas para Si</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
               {mockJobs.filter((j) => j.category === 'technology').slice(0, 3).map((job) => (
                 <Link
                   key={job.id}
                   to={`/vaga/${job.slug}`}
                   className="block rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:shadow-md"
                 >
                   <div className="flex items-start justify-between mb-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                       <Briefcase className="h-5 w-5 text-primary" />
                     </div>
                     {job.isUrgent && <Badge variant="urgent">Urgente</Badge>}
                   </div>
                   <h4 className="font-medium text-foreground mb-1">{job.title}</h4>
                   <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <span>{job.location}</span>
                     {job.isRemote && <Badge variant="remote" className="text-xs">Remoto</Badge>}
                   </div>
                 </Link>
               ))}
             </div>
           </CardContent>
         </Card>
       </div>
     </CandidatoLayout>
   );
 }