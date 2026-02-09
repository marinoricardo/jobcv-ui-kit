import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { JobListItem } from '@/components/JobListItem';
import { Footer } from '@/components/Footer';
import { MobileNavigation } from '@/components/MobileNavigation';
import { FilterModal } from '@/components/FilterModal';
import { mockJobs } from '@/data/mockJobs';
import { Briefcase, Users, Building2, TrendingUp, Sparkles } from 'lucide-react';
import type { JobFilters } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    category: 'all',
    type: 'all',
    location: '',
    remote: false,
  });
  const [salaryRange, setSalaryRange] = useState([0, 300000]);

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

  // Featured jobs (simulated)
  const featuredJobs = mockJobs.filter((job) => job.isUrgent).slice(0, 3);

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      type: 'all',
      location: '',
      remote: false,
    });
    setSalaryRange([0, 300000]);
  };

  const activeFiltersCount = [
    filters.category !== 'all',
    filters.type !== 'all',
    filters.remote,
    salaryRange[0] > 0 || salaryRange[1] < 300000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/40 to-background py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 gap-1.5">
              <Sparkles className="h-3 w-3" />
              +50 novas vagas esta semana
            </Badge>
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

      {/* Featured Jobs - Mobile */}
      {featuredJobs.length > 0 && (
        <section className="border-b border-border py-6 md:hidden">
          <div className="container">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              🔥 Vagas em Destaque
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {featuredJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/vaga/${job.slug}`}
                  className="flex min-w-[280px] items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{job.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{job.company}</p>
                  </div>
                  <Badge variant="urgent" className="shrink-0">Urgente</Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container py-6 md:py-10">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Filters (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
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
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Vagas Disponíveis</h2>
                <p className="text-sm text-muted-foreground">
                  {filteredJobs.length} oportunidades encontradas
                </p>
              </div>

              {/* Mobile Filter Button */}
              <FilterModal
                category={filters.category}
                type={filters.type}
                remote={filters.remote}
                salaryRange={salaryRange}
                onCategoryChange={(category) =>
                  setFilters((prev) => ({ ...prev, category }))
                }
                onTypeChange={(type) =>
                  setFilters((prev) => ({ ...prev, type }))
                }
                onRemoteChange={(remote) =>
                  setFilters((prev) => ({ ...prev, remote }))
                }
                onSalaryRangeChange={setSalaryRange}
                onClearFilters={handleClearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {filteredJobs.map((job) => (
                <JobListItem key={job.id} job={job} />
              ))}

              {filteredJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16">
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
      
      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Index;
