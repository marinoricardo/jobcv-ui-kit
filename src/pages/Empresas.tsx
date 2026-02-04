import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Building2, MapPin, Users, Briefcase, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: string;
  openJobs: number;
  description: string;
}

const companies: Company[] = [
  {
    id: '1',
    name: 'Vodacom Moçambique',
    industry: 'Telecomunicações',
    location: 'Maputo',
    employees: '1000+',
    openJobs: 5,
    description: 'Líder em telecomunicações móveis em Moçambique, oferecendo serviços de voz, dados e soluções digitais.',
  },
  {
    id: '2',
    name: 'Standard Bank Moçambique',
    industry: 'Banca & Finanças',
    location: 'Maputo',
    employees: '500-1000',
    openJobs: 3,
    description: 'Um dos maiores bancos de Moçambique, oferecendo serviços financeiros para particulares e empresas.',
  },
  {
    id: '3',
    name: 'Vale Moçambique',
    industry: 'Mineração',
    location: 'Tete',
    employees: '1000+',
    openJobs: 8,
    description: 'Empresa de mineração focada na extracção de carvão mineral de alta qualidade.',
  },
  {
    id: '4',
    name: 'Cervejas de Moçambique',
    industry: 'Bebidas',
    location: 'Maputo',
    employees: '500-1000',
    openJobs: 2,
    description: 'Principal produtor de bebidas do país, incluindo as marcas 2M e Laurentina.',
  },
  {
    id: '5',
    name: 'Mozabanco',
    industry: 'Banca & Finanças',
    location: 'Maputo',
    employees: '200-500',
    openJobs: 4,
    description: 'Banco moçambicano focado em soluções inovadoras para o mercado local.',
  },
  {
    id: '6',
    name: 'Movitel',
    industry: 'Telecomunicações',
    location: 'Maputo',
    employees: '500-1000',
    openJobs: 6,
    description: 'Operadora de telecomunicações com a maior cobertura de rede em Moçambique.',
  },
];

function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="group cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent">
          <Building2 className="h-7 w-7 text-primary" />
        </div>
        {company.openJobs > 0 && (
          <Badge variant="default" className="font-medium">
            {company.openJobs} vagas
          </Badge>
        )}
      </div>

      <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
        {company.name}
      </h3>
      <p className="mb-3 text-sm text-primary">{company.industry}</p>
      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{company.description}</p>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {company.location}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {company.employees} funcionários
        </span>
      </div>
    </article>
  );
}

export default function Empresas() {
  const [search, setSearch] = useState('');

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Empresas a Contratar
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Descubra as melhores empresas de Moçambique e as suas oportunidades de emprego.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Pesquisar empresas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 rounded-xl pl-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container py-10">
        {/* Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mb-2 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">150+</p>
            <p className="text-sm text-muted-foreground">Empresas parceiras</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mb-2 flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">500+</p>
            <p className="text-sm text-muted-foreground">Vagas activas</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mb-2 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">10K+</p>
            <p className="text-sm text-muted-foreground">Candidatos</p>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {filteredCompanies.length} empresas encontradas
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
            <Building2 className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Nenhuma empresa encontrada
            </h3>
            <p className="text-sm text-muted-foreground">
              Tente ajustar a sua pesquisa
            </p>
          </div>
        )}

        {/* CTA */}
        <section className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-primary-foreground md:p-12">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">É uma empresa?</h2>
          <p className="mb-6 text-primary-foreground/90">
            Publique as suas vagas e encontre os melhores talentos de Moçambique.
          </p>
          <Button size="lg" variant="secondary" className="h-12 rounded-xl px-8">
            Publicar Vaga Grátis
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
