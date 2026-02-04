import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { JobCard } from '@/components/JobCard';
import { AdBanner } from '@/components/AdBanner';
import { JobDetailModal } from '@/components/JobDetailModal';
import { ApplicationModal } from '@/components/ApplicationModal';
import { Footer } from '@/components/Footer';
import { mockJobs } from '@/data/mockJobs';
import type { Job, JobCategory, JobType, JobFilters } from '@/types/job';

const Index = () => {
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    category: 'all',
    type: 'all',
    location: '',
    remote: false,
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        if (!job.location.toLowerCase().includes(locationLower)) return false;
      }

      // Category filter
      if (filters.category !== 'all' && job.category !== filters.category) {
        return false;
      }

      // Type filter
      if (filters.type !== 'all' && job.type !== filters.type) {
        return false;
      }

      // Remote filter
      if (filters.remote && !job.isRemote) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsDetailOpen(false);
    setIsApplicationOpen(true);
  };

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
      <section className="border-b border-border bg-gradient-to-b from-accent/50 to-background py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Encontre a vaga ideal para você
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Milhares de oportunidades em empresas de todo o Brasil
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
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5 shadow-card">
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
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {filteredJobs.length}
                </span>{' '}
                vagas encontradas
              </p>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job, index) => (
                <div key={job.id}>
                  <JobCard job={job} onViewDetails={handleViewDetails} />
                  {/* Ad Banner every 3 jobs */}
                  {(index + 1) % 3 === 0 && index < filteredJobs.length - 1 && (
                    <div className="my-4">
                      <AdBanner size={index % 6 === 2 ? 'large' : 'small'} />
                    </div>
                  )}
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
                  <div className="mb-4 text-6xl">🔍</div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Nenhuma vaga encontrada
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tente ajustar seus filtros ou fazer uma nova busca
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onApply={handleApply}
      />

      <ApplicationModal
        job={selectedJob}
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
      />
    </div>
  );
};

export default Index;
