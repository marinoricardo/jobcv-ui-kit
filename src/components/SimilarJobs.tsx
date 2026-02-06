import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Wallet, ArrowRight, Star } from 'lucide-react';
import type { Job } from '@/types/job';

interface SimilarJobsProps {
  currentJob: Job;
  jobs: Job[];
}

export function SimilarJobs({ currentJob, jobs }: SimilarJobsProps) {
  // Filter similar jobs based on category or company
  const similarJobs = jobs
    .filter(
      (job) =>
        job.id !== currentJob.id &&
        (job.category === currentJob.category || job.company === currentJob.company)
    )
    .slice(0, 3);

  if (similarJobs.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Vagas Similares</h2>
        <Link
          to={`/?category=${currentJob.category}`}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Ver mais <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {similarJobs.map((job) => (
          <Link
            key={job.id}
            to={`/vaga/${job.slug}`}
            className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent">
                <Building2 className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-foreground group-hover:text-primary line-clamp-1">
                      {job.title}
                    </h3>
                    {job.isFeatured && (
                      <Star className="h-3.5 w-3.5 shrink-0 fill-accent-foreground text-accent-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {job.isRemote && (
                    <Badge variant="remote" className="text-[10px]">
                      Remoto
                    </Badge>
                  )}
                  <Badge
                    variant={job.type === 'full-time' ? 'fulltime' : 'parttime'}
                    className="text-[10px]"
                  >
                    {job.type === 'full-time' ? 'Integral' : 'Parcial'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1 font-medium text-foreground">
                      <Wallet className="h-3 w-3 text-muted-foreground" />
                      {job.salary}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
