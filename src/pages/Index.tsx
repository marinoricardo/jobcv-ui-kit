import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { JobCard } from '@/components/JobCard';
import { Footer } from '@/components/Footer';
import { mockJobs } from '@/data/mockJobs';
import { Briefcase, Users, Building2, TrendingUp } from 'lucide-react';
import type { Job, JobCategory, JobType, JobFilters } from '@/types/job';

const Index = () => {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    category: 'all',
    type: 'all',
    location: '',
    remote: false,
  });

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        if (!job.location.toLowerCase().includes(locationLower)) return false;
      }

      if (filters.category !== 'all' && job.category !== filters.category) {
        return false;
      }

      if (filters.type !== 'all' && job.type !== filters.type) {
        return false;
      }

      if (filters.remote && !job.isRemote) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      type: 'all',
      location: '',
      remote: false,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/40 to-background py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Encontre a sua próxima
              <span className="block text-primary">oportunidade em Moçambique</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Milhares de vagas das melhores empresas do país. A sua carreira começa aqui.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <SearchBar
              search={filters.search}
              location={filters.location}
              onSearchChange={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
              onLocationChange={(value) =>
                setFilters((prev) => ({ ...prev, location: value }))
              }
              onSearch={() => {}}
            />
          </div>

          {/* Stats */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex flex-col items-center rounded-xl bg-card/80 p-4 backdrop-blur">
              <Briefcase className="mb-2 h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">500+</span>
              <span className="text-xs text-muted-foreground">Vagas activas</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-card/80 p-4 backdrop-blur">
              <Building2 className="mb-2 h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">150+</span>
              <span className="text-xs text-muted-foreground">Empresas</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-card/80 p-4 backdrop-blur">
              <Users className="mb-2 h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">10K+</span>
              <span className="text-xs text-muted-foreground">Candidatos</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-card/80 p-4 backdrop-blur">
              <TrendingUp className="mb-2 h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">85%</span>
              <span className="text-xs text-muted-foreground">Taxa de sucesso</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-10">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Filters */}
          <aside className="order-2 lg:order-1 lg:col-span-1">
            <div className="sticky top-20 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-foreground">Filtros</h2>
              <FilterBar
                category={filters.category}
                type={filters.type}
                remote={filters.remote}
                onCategoryChange={(category) =>
                  setFilters((prev) => ({ ...prev, category }))
                }
                onTypeChange={(type) =>
                  setFilters((prev) => ({ ...prev, type }))
                }
                onRemoteChange={(remote) =>
                  setFilters((prev) => ({ ...prev, remote }))
                }
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* Job Listings */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Vagas Disponíveis</h2>
                <p className="text-sm text-muted-foreground">
                  {filteredJobs.length} oportunidades encontradas
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}

              {filteredJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <Briefcase className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Nenhuma vaga encontrada
                  </h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Tente ajustar os filtros ou fazer uma nova pesquisa
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
