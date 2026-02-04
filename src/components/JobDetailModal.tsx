import {
  MapPin,
  Building2,
  Clock,
  Wallet,
  X,
  CheckCircle2,
  Gift,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Job } from '@/types/job';

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export function JobDetailModal({
  job,
  isOpen,
  onClose,
  onApply,
}: JobDetailModalProps) {
  if (!job) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {job.isUrgent && <Badge variant="urgent">Urgente</Badge>}
                {job.isRemote && <Badge variant="remote">Remoto</Badge>}
                <Badge variant={job.type === 'full-time' ? 'fulltime' : 'parttime'}>
                  {job.type === 'full-time' ? 'Full-time' : 'Part-time'}
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {job.title}
              </DialogTitle>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              {job.company}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Publicado em {formatDate(job.postedAt)}
            </span>
          </div>

          {job.salary && (
            <div className="rounded-lg bg-accent p-3">
              <span className="flex items-center gap-2 font-semibold text-accent-foreground">
                <Wallet className="h-5 w-5" />
                {job.salary}
              </span>
            </div>
          )}
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Description */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Descrição</h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">{job.description}</p>
          </section>

          {/* Requirements */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Requisitos</h3>
            </div>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </section>

          {/* Benefits */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Benefícios</h3>
            </div>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-badge-remote" />
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Apply Button */}
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
          <Button
            variant="apply"
            size="lg"
            className="flex-1"
            onClick={() => onApply(job)}
          >
            Candidatar-se
          </Button>
          <Button variant="outline" size="lg" onClick={onClose}>
            Voltar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
