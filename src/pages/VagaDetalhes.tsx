 import { useParams, Link, useNavigate } from 'react-router-dom';
 import { Header } from '@/components/Header';
 import { Footer } from '@/components/Footer';
 import { mockJobs } from '@/data/mockJobs';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { 
   ArrowLeft, 
   MapPin, 
   Clock, 
   Briefcase, 
   Building2, 
   Wifi, 
   AlertCircle,
   Share2,
   Heart,
   CheckCircle2,
   Calendar
 } from 'lucide-react';
import { useState } from 'react';
import { ApplicationModal } from '@/components/ApplicationModal';
import { MobileNavigation } from '@/components/MobileNavigation';
import { SimilarJobs } from '@/components/SimilarJobs';
 
 export default function VagaDetalhes() {
   const { slug } = useParams<{ slug: string }>();
   const navigate = useNavigate();
   const [isApplicationOpen, setIsApplicationOpen] = useState(false);
   const [isSaved, setIsSaved] = useState(false);
 
   const job = mockJobs.find((j) => j.slug === slug);
 
   if (!job) {
     return (
       <div className="min-h-screen bg-background">
         <Header />
         <main className="container py-20 text-center">
           <div className="mx-auto max-w-md">
             <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-secondary">
               <AlertCircle className="h-10 w-10 text-muted-foreground" />
             </div>
             <h1 className="mb-3 text-2xl font-bold text-foreground">Vaga não encontrada</h1>
             <p className="mb-6 text-muted-foreground">
               A vaga que procura pode ter sido removida ou o link está incorreto.
             </p>
             <Button onClick={() => navigate('/')}>
               <ArrowLeft className="mr-2 h-4 w-4" />
               Ver todas as vagas
             </Button>
           </div>
         </main>
         <Footer />
       </div>
     );
   }
 
   const formatDate = (dateStr: string) => {
     return new Date(dateStr).toLocaleDateString('pt-MZ', {
       day: 'numeric',
       month: 'long',
       year: 'numeric',
     });
   };
 
   const handleShare = async () => {
     if (navigator.share) {
       await navigator.share({
         title: job.title,
         text: `Vaga: ${job.title} na ${job.company}`,
         url: window.location.href,
       });
     } else {
       navigator.clipboard.writeText(window.location.href);
     }
   };
 
   return (
    <div className="min-h-screen bg-background">
        <Header />

        {/* SEO - JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: job.title,
              description: job.description,
              datePosted: job.postedAt,
              employmentType: job.type === 'full-time' ? 'FULL_TIME' : 'PART_TIME',
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: job.location,
                  addressCountry: "MZ",
                },
              },
              hiringOrganization: {
                "@type": "Organization",
                name: job.company,
              },
              ...(job.isRemote && { jobLocationType: "TELECOMMUTE" }),
            }),
          }}
        />
 
       {/* Breadcrumb */}
       <div className="border-b border-border bg-card">
         <div className="container py-4">
           <nav className="flex items-center gap-2 text-sm text-muted-foreground">
             <Link to="/" className="hover:text-foreground transition-colors">Vagas</Link>
             <span>/</span>
             <span className="text-foreground">{job.title}</span>
           </nav>
         </div>
       </div>
 
       <main className="container py-8">
         <div className="grid gap-8 lg:grid-cols-3">
           {/* Main Content */}
           <div className="lg:col-span-2 space-y-6">
             {/* Header Card */}
             <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
               <div className="flex flex-wrap gap-2 mb-4">
                 {job.isUrgent && (
                   <Badge variant="urgent" className="gap-1">
                     <AlertCircle className="h-3 w-3" />
                     Urgente
                   </Badge>
                 )}
                 {job.isRemote && (
                   <Badge variant="remote" className="gap-1">
                     <Wifi className="h-3 w-3" />
                     Remoto
                   </Badge>
                 )}
                 <Badge variant={job.type === 'full-time' ? 'fulltime' : 'parttime'}>
                   {job.type === 'full-time' ? 'Tempo Integral' : 'Part-time'}
                 </Badge>
               </div>
 
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {job.title}
                </h1>
                <p className="text-sm text-muted-foreground mb-4">
                  {job.company} · {job.location}
                </p>
 
               <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                 <div className="flex items-center gap-2">
                   <Building2 className="h-4 w-4" />
                   <span className="font-medium text-foreground">{job.company}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <MapPin className="h-4 w-4" />
                   <span>{job.location}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Calendar className="h-4 w-4" />
                   <span>Publicada {formatDate(job.postedAt)}</span>
                 </div>
               </div>
 
               {job.salary && (
                 <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-primary font-semibold">
                   <Briefcase className="h-4 w-4" />
                   {job.salary}
                 </div>
               )}
             </div>
 
             {/* Description */}
             <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
               <h2 className="text-xl font-semibold text-foreground mb-4">Descrição da Vaga</h2>
               <p className="text-muted-foreground leading-relaxed">{job.description}</p>
             </div>
 
             {/* Requirements */}
             <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
               <h2 className="text-xl font-semibold text-foreground mb-4">Requisitos</h2>
               <ul className="space-y-3">
                 {job.requirements.map((req, index) => (
                   <li key={index} className="flex items-start gap-3">
                     <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                     <span className="text-muted-foreground">{req}</span>
                   </li>
                 ))}
               </ul>
             </div>
 
             {/* Benefits */}
             <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
               <h2 className="text-xl font-semibold text-foreground mb-4">Benefícios</h2>
               <div className="grid gap-3 sm:grid-cols-2">
                 {job.benefits.map((benefit, index) => (
                   <div key={index} className="flex items-center gap-3 rounded-lg bg-accent/50 px-4 py-3">
                     <CheckCircle2 className="h-4 w-4 text-primary" />
                     <span className="text-sm text-foreground">{benefit}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
 
           {/* Sidebar */}
           <div className="space-y-4">
             <div className="sticky top-20 space-y-4">
               {/* Apply Card */}
               <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex gap-2">
                   <Button 
                     variant="outline" 
                     className="flex-1"
                     onClick={() => setIsSaved(!isSaved)}
                   >
                     <Heart className={`mr-2 h-4 w-4 ${isSaved ? 'fill-primary text-primary' : ''}`} />
                     {isSaved ? 'Guardada' : 'Guardar'}
                   </Button>
                   <Button variant="outline" className="flex-1" onClick={handleShare}>
                     <Share2 className="mr-2 h-4 w-4" />
                     Partilhar
                   </Button>
                 </div>
               </div>
 
               {/* Company Card */}
               <div className="rounded-2xl border border-border bg-card p-6">
                 <h3 className="font-semibold text-foreground mb-4">Sobre a Empresa</h3>
                 <div className="flex items-center gap-4 mb-4">
                   <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                     <Building2 className="h-7 w-7 text-primary" />
                   </div>
                   <div>
                     <p className="font-medium text-foreground">{job.company}</p>
                     <p className="text-sm text-muted-foreground">{job.location}</p>
                   </div>
                 </div>
                 <Button variant="outline" className="w-full" asChild>
                   <Link to={`/empresas/${job.company.toLowerCase().replace(/\s+/g, '-')}`}>
                     Ver Perfil da Empresa
                   </Link>
                 </Button>
               </div>
 
               {/* Similar Jobs */}
               <div className="rounded-2xl border border-border bg-card p-6">
                 <h3 className="font-semibold text-foreground mb-4">Vagas Similares</h3>
                 <div className="space-y-3">
                   {mockJobs
                     .filter((j) => j.category === job.category && j.id !== job.id)
                     .slice(0, 3)
                     .map((similarJob) => (
                       <Link
                         key={similarJob.id}
                         to={`/vaga/${similarJob.slug}`}
                         className="block rounded-lg border border-border p-3 transition-colors hover:border-primary/30 hover:bg-accent/50"
                       >
                         <p className="font-medium text-foreground text-sm">{similarJob.title}</p>
                         <p className="text-xs text-muted-foreground">{similarJob.company}</p>
                       </Link>
                     ))}
                 </div>
               </div>
              </div>
            </div>
          </div>

          {/* Similar Jobs Section - Mobile */}
          <div className="lg:hidden">
            <SimilarJobs currentJob={job} jobs={mockJobs} />
          </div>
        </main>

        <Footer />
        <MobileNavigation />

        <ApplicationModal
          job={job}
          isOpen={isApplicationOpen}
          onClose={() => setIsApplicationOpen(false)}
        />
      </div>
    );
  }