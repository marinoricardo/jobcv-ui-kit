import { MapPin, Building2, Clock, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Job } from '@/types/job';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

export function JobCard({ job, onViewDetails }: JobCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hoje';
    if (diffDays === 2) return 'Ontem';
    if (diffDays <= 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <article
      className="group cursor-pointer rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-200 hover:border-primary/20 hover:shadow-card-hover"
      onClick={() => onViewDetails(job)}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {job.isUrgent && <Badge variant="urgent">Urgente</Badge>}
              {job.isRemote && <Badge variant="remote">Remoto</Badge>}
              <Badge variant={job.type === 'full-time' ? 'fulltime' : 'parttime'}>
                {job.type === 'full-time' ? 'Full-time' : 'Part-time'}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {job.title}
            </h3>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
            <Building2 className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        {/* Company & Location */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4" />
            {job.company}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {job.location}
          </span>
          {job.salary && (
            <span className="flex items-center gap-1.5">
              <Wallet className="h-4 w-4" />
              {job.salary}
            </span>
          )}
        </div>

        {/* Description Preview */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {job.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {formatDate(job.postedAt)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(job);
            }}
          >
            Ver detalhes
          </Button>
        </div>
      </div>
    </article>
  );
}
