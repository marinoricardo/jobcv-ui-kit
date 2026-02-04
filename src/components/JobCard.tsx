import { MapPin, Building2, Clock, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
    if (diffDays <= 7) return `há ${diffDays} dias`;
    return date.toLocaleDateString('pt-MZ');
  };

  return (
    <article
      className="group cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
      onClick={() => onViewDetails(job)}
    >
      <div className="flex gap-4">
        {/* Company Logo Placeholder */}
        <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent sm:flex">
          <Building2 className="h-7 w-7 text-primary" />
        </div>

        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {job.isUrgent && <Badge variant="urgent">Urgente</Badge>}
              {job.isRemote && <Badge variant="remote">Remoto</Badge>}
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
            <Badge variant={job.type === 'full-time' ? 'fulltime' : 'parttime'} className="font-medium">
              {job.type === 'full-time' ? 'Tempo integral' : 'Tempo parcial'}
            </Badge>
            {job.salary && (
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                {job.salary}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {formatDate(job.postedAt)}
            </span>
            <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Ver detalhes →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
