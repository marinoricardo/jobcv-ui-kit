import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { blogPosts, BlogPost } from '@/data/mockJobs';
import { Clock, User, ArrowRight, TrendingUp, BookOpen, Briefcase, Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categoryIcons: Record<string, React.ReactNode> = {
  'Carreira': <Briefcase className="h-4 w-4" />,
  'Tendências': <TrendingUp className="h-4 w-4" />,
  'Trabalho Remoto': <Wifi className="h-4 w-4" />,
  'Entrevistas': <User className="h-4 w-4" />,
  'Tecnologia': <BookOpen className="h-4 w-4" />,
};

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-MZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="group block cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 via-accent to-primary/10 p-8">
          <div className="flex h-full flex-col justify-end">
            <Badge variant="secondary" className="mb-4 w-fit gap-1.5">
              {categoryIcons[post.category]}
              {post.category}
            </Badge>
            <h2 className="text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
              {post.title}
            </h2>
          </div>
        </div>
        <div className="p-6">
          <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="group block cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      <Badge variant="secondary" className="mb-3 gap-1.5">
        {categoryIcons[post.category]}
        {post.category}
      </Badge>
      <h3 className="mb-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">{post.author}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {post.readTime}
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  const [email, setEmail] = useState('');
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Blog de Carreira
            </h1>
            <p className="text-lg text-muted-foreground">
              Dicas, tendências e insights para impulsionar a sua carreira profissional em Moçambique.
            </p>
          </div>
        </div>
      </section>

      <main className="container py-10">
        {/* Featured Posts */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Artigos em Destaque</h2>
            <Button variant="ghost" className="gap-1 text-primary">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mb-12 rounded-2xl bg-gradient-to-r from-primary/10 via-accent to-primary/5 p-8 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              Receba as melhores oportunidades
            </h2>
            <p className="mb-6 text-muted-foreground">
              Subscreva a nossa newsletter e receba vagas exclusivas e dicas de carreira directamente no seu email.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Input
                type="email"
                placeholder="O seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-xl sm:max-w-xs"
                required
              />
              <Button type="submit" size="lg" className="h-12 rounded-xl px-8">
                Subscrever
              </Button>
            </form>
          </div>
        </section>

        {/* All Posts */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Todos os Artigos</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Explorar por Categoria</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Object.entries(categoryIcons).map(([category, icon]) => (
              <button
                key={category}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  {icon}
                </div>
                <span className="font-medium text-foreground">{category}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
