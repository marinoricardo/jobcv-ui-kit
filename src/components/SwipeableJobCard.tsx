import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Clock, Wallet, Heart, Send, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Job } from '@/types/job';

interface SwipeableJobCardProps {
  job: Job;
  onSave?: (job: Job) => void;
  onQuickApply?: (job: Job) => void;
}

export function SwipeableJobCard({ job, onSave, onQuickApply }: SwipeableJobCardProps) {
  const [swipeX, setSwipeX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const startX = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    // Limit swipe distance
    const clampedDiff = Math.max(-100, Math.min(100, diff));
    setSwipeX(clampedDiff);
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    
    if (swipeX > 60) {
      // Swipe right - Save
      setIsSaved(true);
      onSave?.(job);
    } else if (swipeX < -60) {
      // Swipe left - Quick Apply
      onQuickApply?.(job);
    }
    
    setSwipeX(0);
  };

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
    <div className="relative overflow-hidden rounded-2xl">
      {/* Swipe indicators */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 flex w-20 items-center justify-center bg-badge-remote transition-opacity',
          swipeX > 30 ? 'opacity-100' : 'opacity-0'
        )}
      >
        <Heart className="h-6 w-6 text-white" fill="white" />
      </div>
      <div
        className={cn(
          'absolute inset-y-0 right-0 flex w-20 items-center justify-center bg-primary transition-opacity',
          swipeX < -30 ? 'opacity-100' : 'opacity-0'
        )}
      >
        <Send className="h-6 w-6 text-white" />
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          'relative border border-border bg-card p-5 shadow-sm transition-transform',
          isSwiping ? '' : 'transition-all duration-200'
        )}
        style={{ transform: `translateX(${swipeX}px)` }}
      >
        <Link to={`/vaga/${job.slug}`} className="block">
          <div className="flex gap-4">
            {/* Company Logo */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent">
              <Building2 className="h-6 w-6 text-primary" />
            </div>

            <div className="flex-1 space-y-2">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    {job.isFeatured && (
                      <Star className="h-4 w-4 fill-accent-foreground text-accent-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                {isSaved && (
                  <Heart className="h-5 w-5 fill-badge-remote text-badge-remote" />
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {job.isUrgent && <Badge variant="urgent">Urgente</Badge>}
                {job.isRemote && <Badge variant="remote">Remoto</Badge>}
                <Badge variant={job.type === 'full-time' ? 'fulltime' : 'parttime'}>
                  {job.type === 'full-time' ? 'Integral' : 'Parcial'}
                </Badge>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1 font-medium text-foreground">
                    <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
                    {job.salary}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDate(job.postedAt)}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Swipe hint (mobile only) */}
        <div className="mt-3 flex items-center justify-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground md:hidden">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" /> Deslize para guardar
          </span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1">
            <Send className="h-3 w-3" /> Deslize para candidatar
          </span>
        </div>
      </div>
    </div>
  );
}
