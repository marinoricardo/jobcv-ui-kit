 import { useParams, Link, useNavigate } from 'react-router-dom';
 import { Header } from '@/components/Header';
 import { Footer } from '@/components/Footer';
 import { blogPosts } from '@/data/mockJobs';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { 
   ArrowLeft, 
   Clock, 
   User, 
   Calendar,
   Share2,
   BookmarkPlus,
   AlertCircle,
   Facebook,
   Twitter,
   Linkedin
 } from 'lucide-react';
 import { useState } from 'react';
 
 export default function BlogPost() {
   const { slug } = useParams<{ slug: string }>();
   const navigate = useNavigate();
   const [isBookmarked, setIsBookmarked] = useState(false);
 
   const post = blogPosts.find((p) => p.slug === slug);
 
   if (!post) {
     return (
       <div className="min-h-screen bg-background">
         <Header />
         <main className="container py-20 text-center">
           <div className="mx-auto max-w-md">
             <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-secondary">
               <AlertCircle className="h-10 w-10 text-muted-foreground" />
             </div>
             <h1 className="mb-3 text-2xl font-bold text-foreground">Artigo não encontrado</h1>
             <p className="mb-6 text-muted-foreground">
               O artigo que procura pode ter sido removido ou o link está incorreto.
             </p>
             <Button onClick={() => navigate('/blog')}>
               <ArrowLeft className="mr-2 h-4 w-4" />
               Ver todos os artigos
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
         title: post.title,
         text: post.excerpt,
         url: window.location.href,
       });
     } else {
       navigator.clipboard.writeText(window.location.href);
     }
   };
 
   const relatedPosts = blogPosts
     .filter((p) => p.category === post.category && p.id !== post.id)
     .slice(0, 3);
 
   // Mock content for the post
   const mockContent = `
     <p>O mercado de trabalho moçambicano está em constante evolução, e preparar um currículo que se destaque é fundamental para conseguir a vaga dos seus sonhos.</p>
     
     <h2>1. Estruture o seu CV de forma clara</h2>
     <p>Um CV bem estruturado facilita a leitura e demonstra organização. Comece com os seus dados pessoais, seguidos de um breve resumo profissional, experiência, formação e competências.</p>
     
     <h2>2. Destaque as suas conquistas</h2>
     <p>Em vez de apenas listar responsabilidades, foque nas conquistas e resultados que obteve em cada posição. Use números e métricas sempre que possível.</p>
     
     <h2>3. Adapte o CV para cada vaga</h2>
     <p>Personalize o seu currículo para cada candidatura, destacando as competências e experiências mais relevantes para a posição.</p>
     
     <h2>4. Mantenha-o actualizado</h2>
     <p>Revise regularmente o seu CV para adicionar novas competências, formações e experiências. Um CV desactualizado pode prejudicar as suas chances.</p>
     
     <h2>5. Revise a ortografia</h2>
     <p>Erros de ortografia ou gramática podem transmitir falta de atenção aos detalhes. Revise várias vezes e peça a alguém para verificar.</p>
   `;
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
 
       {/* Breadcrumb */}
       <div className="border-b border-border bg-card">
         <div className="container py-4">
           <nav className="flex items-center gap-2 text-sm text-muted-foreground">
             <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
             <span>/</span>
             <span className="text-foreground line-clamp-1">{post.title}</span>
           </nav>
         </div>
       </div>
 
       <main className="container py-8">
         <div className="grid gap-8 lg:grid-cols-3">
           {/* Main Content */}
           <article className="lg:col-span-2">
             {/* Header */}
             <div className="mb-8">
               <Badge variant="secondary" className="mb-4">
                 {post.category}
               </Badge>
               <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                 {post.title}
               </h1>
               <p className="text-lg text-muted-foreground mb-6">
                 {post.excerpt}
               </p>
               
               <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border">
                 <div className="flex items-center gap-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                     <User className="h-6 w-6 text-muted-foreground" />
                   </div>
                   <div>
                     <p className="font-medium text-foreground">{post.author}</p>
                     <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
                   <span className="flex items-center gap-1.5">
                     <Calendar className="h-4 w-4" />
                     {formatDate(post.publishedAt)}
                   </span>
                   <span className="flex items-center gap-1.5">
                     <Clock className="h-4 w-4" />
                     {post.readTime} de leitura
                   </span>
                 </div>
               </div>
             </div>
 
             {/* Featured Image Placeholder */}
             <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 via-accent to-primary/10 mb-8 flex items-center justify-center">
               <div className="text-center">
                 <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-card/80 mb-3">
                   <BookmarkPlus className="h-8 w-8 text-primary" />
                 </div>
                 <p className="text-muted-foreground">Imagem do Artigo</p>
               </div>
             </div>
 
             {/* Content */}
             <div 
               className="prose prose-lg max-w-none text-muted-foreground
                 prose-headings:text-foreground prose-headings:font-semibold
                 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                 prose-p:leading-relaxed prose-p:mb-4"
               dangerouslySetInnerHTML={{ __html: mockContent }}
             />
 
             {/* Share Section */}
             <div className="mt-10 pt-6 border-t border-border">
               <div className="flex flex-wrap items-center justify-between gap-4">
                 <p className="font-medium text-foreground">Partilhar este artigo:</p>
                 <div className="flex gap-2">
                   <Button variant="outline" size="icon" onClick={handleShare}>
                     <Share2 className="h-4 w-4" />
                   </Button>
                   <Button variant="outline" size="icon">
                     <Facebook className="h-4 w-4" />
                   </Button>
                   <Button variant="outline" size="icon">
                     <Twitter className="h-4 w-4" />
                   </Button>
                   <Button variant="outline" size="icon">
                     <Linkedin className="h-4 w-4" />
                   </Button>
                 </div>
               </div>
             </div>
           </article>
 
           {/* Sidebar */}
           <aside className="space-y-6">
             <div className="sticky top-20 space-y-6">
               {/* Actions */}
               <div className="rounded-2xl border border-border bg-card p-6">
                 <Button 
                   variant={isBookmarked ? "secondary" : "outline"} 
                   className="w-full"
                   onClick={() => setIsBookmarked(!isBookmarked)}
                 >
                   <BookmarkPlus className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                   {isBookmarked ? 'Guardado' : 'Guardar Artigo'}
                 </Button>
               </div>
 
               {/* Author */}
               <div className="rounded-2xl border border-border bg-card p-6">
                 <h3 className="font-semibold text-foreground mb-4">Sobre o Autor</h3>
                 <div className="flex items-center gap-4 mb-4">
                   <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                     <User className="h-7 w-7 text-primary" />
                   </div>
                   <div>
                     <p className="font-medium text-foreground">{post.author}</p>
                     <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                   </div>
                 </div>
                 <p className="text-sm text-muted-foreground">
                   Especialista com mais de 10 anos de experiência no mercado moçambicano, focado em ajudar profissionais a alcançar o seu potencial.
                 </p>
               </div>
 
               {/* Related Posts */}
               {relatedPosts.length > 0 && (
                 <div className="rounded-2xl border border-border bg-card p-6">
                   <h3 className="font-semibold text-foreground mb-4">Artigos Relacionados</h3>
                   <div className="space-y-3">
                     {relatedPosts.map((relatedPost) => (
                       <Link
                         key={relatedPost.id}
                         to={`/blog/${relatedPost.slug}`}
                         className="block rounded-lg border border-border p-3 transition-colors hover:border-primary/30 hover:bg-accent/50"
                       >
                         <p className="font-medium text-foreground text-sm line-clamp-2">{relatedPost.title}</p>
                         <p className="text-xs text-muted-foreground mt-1">{relatedPost.readTime}</p>
                       </Link>
                     ))}
                   </div>
                 </div>
               )}
 
               {/* CTA */}
               <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-accent to-primary/5 p-6">
                 <h3 className="font-semibold text-foreground mb-2">Procura emprego?</h3>
                 <p className="text-sm text-muted-foreground mb-4">
                   Explore centenas de vagas nas melhores empresas de Moçambique.
                 </p>
                 <Button asChild className="w-full">
                   <Link to="/">Ver Vagas</Link>
                 </Button>
               </div>
             </div>
           </aside>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 }