import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/types/job';

interface JobListItemProps {
  job: Job;
}

export function JobListItem({ job }: JobListItemProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hoje';
    if (diffDays === 2) return 'Ontem';
    if (diffDays <= 7) return `${diffDays}d`;
    return date.toLocaleDateString('pt-MZ', { day: '2-digit', month: 'short' });
  };

  const getCompanyInitials = (company: string) => {
    return company
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Link
      to={`/vaga/${job.slug}`}
      className="group flex items-center gap-4 border-b border-border/50 px-4 py-3.5 transition-colors hover:bg-muted/30 last:border-b-0"
    >
      {/* Company Initials */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">
        {getCompanyInitials(job.company)}
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Title & Company */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            {job.title}
          </h3>
          <p className="truncate text-xs text-muted-foreground">{job.company}</p>
        </div>

        {/* Location - Hidden on very small screens */}
        <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
          <MapPin className="h-3 w-3" />
          <span className="max-w-[120px] truncate">{job.location}</span>
        </div>

        {/* Badges */}
        <div className="hidden items-center gap-1.5 md:flex">
          {job.isUrgent && (
            <Badge variant="urgent">
              Urgente
            </Badge>
          )}
          {job.isRemote && (
            <Badge variant="remote">
              Remoto
            </Badge>
          )}
          <Badge variant="outline" className="text-muted-foreground">
            {job.type === 'full-time' ? 'Integral' : 'Parcial'}
          </Badge>
        </div>

        {/* Date */}
        <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatDate(job.postedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
