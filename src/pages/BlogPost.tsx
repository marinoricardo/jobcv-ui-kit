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
      <h1>Como preparar um CV que se destaca no mercado moçambicano</h1>

    <p>Procurar emprego em Moçambique pode ser um desafio. Todos os dias, milhares de candidatos enviam currículos para vagas em bancos, ONGs, empresas de telecomunicações, indústrias, startups e instituições públicas — e a maioria nunca recebe resposta. O problema, na maior parte das vezes, não é falta de talento, mas sim a forma como esse talento é apresentado.</p>

    <p>O currículo (CV) é o teu primeiro contacto com o recrutador. Antes mesmo de uma entrevista, antes de um telefonema, antes de qualquer explicação, é o teu CV que fala por ti. E ele tem poucos segundos para cumprir essa missão.</p>

    <p class="emoji">👉 Dica rápida:</p>
    <p>Se ainda não tens um CV bem estruturado ou queres modernizar o teu, plataformas como o <strong>MeuCV</strong> permitem criar currículos profissionais em poucos minutos, já adaptados ao mercado moçambicano.</p>

    <p>Neste artigo completo, vais aprender como preparar um CV que realmente se destaca no mercado moçambicano, alinhado com as expectativas dos recrutadores locais, evitando erros comuns e aumentando significativamente as tuas hipóteses de ser chamado para entrevistas.</p>

    <h2>1. Entender o mercado de trabalho moçambicano</h2>
    <p>Antes de escrever ou atualizar o teu CV, é importante compreender o contexto do mercado de trabalho em Moçambique.</p>
    <p>A maioria dos recrutadores moçambicanos valoriza:</p>
    <ul>
        <li>Clareza e objetividade</li>
        <li>Experiência prática (mesmo estágios ou trabalho informal)</li>
        <li>Competências técnicas relevantes</li>
        <li>Boa apresentação do documento</li>
        <li>Comunicação clara em português (e inglês, quando aplicável)</li>
    </ul>
    <p>Ao mesmo tempo, muitos currículos são descartados por serem confusos, genéricos ou visualmente desorganizados.</p>

    <div class="note">
        📌 Nota importante: um CV bem formatado facilita muito esta primeira triagem. Ferramentas como o <strong>MeuCV</strong> já seguem estruturas aprovadas por recrutadores, evitando erros comuns logo de início.
    </div>

    <h2>2. Estrutura ideal de um CV profissional</h2>
    <p>Um currículo bem estruturado aumenta as chances de ser lido até ao fim. No mercado moçambicano, a estrutura mais eficaz costuma ser:</p>
    <ul>
        <li>Dados pessoais</li>
        <li>Perfil profissional</li>
        <li>Experiência profissional</li>
        <li>Formação académica</li>
        <li>Competências</li>
        <li>Idiomas</li>
        <li>Informações adicionais</li>
    </ul>
    <p class="emoji">👉 Se não sabes por onde começar, o <strong>MeuCV</strong> já oferece modelos prontos com esta estrutura, bastando preencher os teus dados.</p>

    <h2>3. Dados pessoais: menos é mais</h2>
    <p>Inclui apenas:</p>
    <ul>
        <li>Nome completo</li>
        <li>Telefone ativo</li>
        <li>E-mail profissional</li>
        <li>Cidade/província</li>
    </ul>
    <p>Evita informações como BI, estado civil ou endereço completo. Se incluíres foto, opta por uma imagem profissional e neutra.</p>
    <div class="note">
        💡 Dica prática: muitos candidatos perdem oportunidades por detalhes simples. Um CV criado numa plataforma dedicada como o <strong>MeuCV</strong> já elimina esses excessos automaticamente.
    </div>

    <h2>4. Perfil profissional: o teu resumo estratégico</h2>
    <p>O perfil profissional é um pequeno parágrafo que resume quem és e o que procuras.</p>
    <p><em>Exemplo:</em></p>
    <p>Profissional da área administrativa com experiência em gestão documental e atendimento ao cliente, à procura de novas oportunidades de crescimento profissional.</p>
    <div class="note">
        📍 CTA discreto: no <strong>MeuCV</strong>, este resumo é um campo guiado — a plataforma ajuda-te a escrever um perfil claro mesmo que não saibas por onde começar.
    </div>

    <h2>5. Experiência profissional: mostra impacto, não só tarefas</h2>
    <p>Sempre que possível, descreve resultados e responsabilidades reais. Mesmo trabalhos informais contam, desde que bem apresentados.</p>
    <p class="emoji">👉 Lembra-te:</p>
    <p>Um CV bem organizado valoriza até pequenas experiências. É por isso que muitos candidatos usam o <strong>MeuCV</strong> para estruturar melhor aquilo que já fizeram, sem inventar nem exagerar.</p>

    <h2>6. Formação académica: simples e objetiva</h2>
    <p>Indica apenas o essencial:</p>
    <ul>
        <li>Curso</li>
        <li>Instituição</li>
        <li>Ano ou situação atual</li>
    </ul>
    <p>Evita listas longas ou informação desnecessária.</p>

    <h2>7. Competências que fazem diferença</h2>
    <p>Seleciona apenas competências relevantes para a vaga.</p>
    <ul>
        <li>Técnicas (Excel, sistemas, ferramentas)</li>
        <li>Comportamentais (organização, comunicação, trabalho em equipa)</li>
    </ul>
    <div class="note">
        📌 Dica: plataformas como o <strong>MeuCV</strong> ajudam a organizar estas competências de forma visual e profissional, facilitando a leitura pelo recrutador.
    </div>

    <h2>8. Idiomas: sê honesto</h2>
    <p>Indica apenas idiomas que realmente dominas. O inglês continua a ser um diferencial forte em Moçambique.</p>

    <h2>9. Layout e apresentação: o visual conta (e muito)</h2>
    <p>Um CV desorganizado pode ser descartado mesmo com bom conteúdo.</p>
    <ul>
        <li>Fonte simples</li>
        <li>Espaçamento equilibrado</li>
        <li>No máximo 2 páginas</li>
        <li>Design limpo</li>
    </ul>
    <p class="emoji">👉 Aqui está o pulo do gato:</p>
    <p>Criar o CV no <strong>MeuCV</strong> garante um layout profissional, moderno e compatível com impressão e PDF — sem precisares de saber design.</p>

    <h2>10. Erros comuns que deves evitar</h2>
    <ul>
        <li>Erros ortográficos</li>
        <li>CV genérico para todas as vagas</li>
        <li>Informações falsas</li>
        <li>Documentos longos demais</li>
    </ul>
    <div class="note">
        📍 CTA leve: se queres evitar estes erros, usar uma plataforma dedicada como o <strong>MeuCV</strong> reduz drasticamente esse risco.
    </div>

    <h2>11. Adapta o CV para cada vaga</h2>
    <p>Personalizar o CV aumenta muito as hipóteses de sucesso. Pequenos ajustes fazem grande diferença — e são rápidos quando o CV já está bem estruturado.</p>
    <p class="emoji">👉 Com o <strong>MeuCV</strong>, podes editar e gerar novas versões do teu currículo em minutos, adaptando para diferentes oportunidades.</p>

    <h2>12. Conclusão: o teu próximo passo começa agora</h2>
    <p>Um bom CV não garante emprego, mas um CV fraco quase garante rejeição. No mercado moçambicano, onde a concorrência é elevada, apresentar bem o teu perfil é essencial.</p>
    <p>Se estás à procura de emprego, a mudar de carreira ou simplesmente queres estar preparado para a próxima oportunidade, começa pelo básico: um currículo claro, profissional e estratégico.</p>
    
    <a href="https://www.meucv.com" class="cta">🚀 Criar ou melhorar o meu CV agora</a>
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
