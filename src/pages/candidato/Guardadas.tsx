import { useState } from 'react';
import { CandidatoLayout } from '@/components/candidato/CandidatoLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockJobs } from '@/data/mockJobs';
import {
  Heart,
  Trash2,
  MapPin,
  Building2,
  Wallet,
  Clock,
  ExternalLink,
  GitCompare,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Job } from '@/types/job';

export default function Guardadas() {
  const [savedJobs, setSavedJobs] = useState<Job[]>(mockJobs.slice(0, 4));
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const removeJob = (id: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== id));
    setSelectedForCompare((prev) => prev.filter((jobId) => jobId !== id));
  };

  const toggleCompareSelection = (id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((jobId) => jobId !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const selectedJobs = savedJobs.filter((job) => selectedForCompare.includes(job.id));

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-MZ', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <CandidatoLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vagas Guardadas</h1>
            <p className="text-muted-foreground">
              {savedJobs.length} vagas guardadas
            </p>
          </div>
          <Button
            variant={compareMode ? 'default' : 'outline'}
            onClick={() => {
              setCompareMode(!compareMode);
              if (compareMode) setSelectedForCompare([]);
            }}
            className="gap-2"
          >
            <GitCompare className="h-4 w-4" />
            {compareMode ? 'Sair do comparador' : 'Comparar vagas'}
          </Button>
        </div>

        {/* Compare Mode Banner */}
        {compareMode && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm text-foreground">
              Selecione até 3 vagas para comparar.{' '}
              <span className="font-medium text-primary">
                {selectedForCompare.length}/3 seleccionadas
              </span>
            </p>
            {selectedForCompare.length >= 2 && (
              <Button size="sm">
                Comparar ({selectedForCompare.length})
              </Button>
            )}
          </div>
        )}

        {/* Comparison Table */}
        {selectedForCompare.length >= 2 && compareMode && (
          <div className="mb-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Atributo
                  </th>
                  {selectedJobs.map((job) => (
                    <th key={job.id} className="p-4 text-left">
                      <div className="font-semibold text-foreground">{job.title}</div>
                      <div className="text-sm text-muted-foreground">{job.company}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm text-muted-foreground">Localização</td>
                  {selectedJobs.map((job) => (
                    <td key={job.id} className="p-4 text-sm text-foreground">
                      {job.location}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm text-muted-foreground">Salário</td>
                  {selectedJobs.map((job) => (
                    <td key={job.id} className="p-4 text-sm font-medium text-foreground">
                      {job.salary || 'Não informado'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm text-muted-foreground">Tipo</td>
                  {selectedJobs.map((job) => (
                    <td key={job.id} className="p-4">
                      <Badge variant={job.type === 'full-time' ? 'fulltime' : 'parttime'}>
                        {job.type === 'full-time' ? 'Integral' : 'Parcial'}
                      </Badge>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-sm text-muted-foreground">Remoto</td>
                  {selectedJobs.map((job) => (
                    <td key={job.id} className="p-4 text-sm text-foreground">
                      {job.isRemote ? 'Sim' : 'Não'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-sm text-muted-foreground">Requisitos</td>
                  {selectedJobs.map((job) => (
                    <td key={job.id} className="p-4 text-sm text-foreground">
                      {job.requirements.length} requisitos
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Saved Jobs Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className={`group relative rounded-2xl border bg-card p-5 transition-all ${
                compareMode && selectedForCompare.includes(job.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/30'
              }`}
              onClick={() => compareMode && toggleCompareSelection(job.id)}
            >
              {compareMode && (
                <div
                  className={`absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                    selectedForCompare.includes(job.id)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card'
                  }`}
                >
                  {selectedForCompare.includes(job.id) && (
                    <span className="text-xs font-bold">
                      {selectedForCompare.indexOf(job.id) + 1}
                    </span>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {job.isRemote && <Badge variant="remote">Remoto</Badge>}
                    <Badge variant={job.type === 'full-time' ? 'fulltime' : 'parttime'}>
                      {job.type === 'full-time' ? 'Integral' : 'Parcial'}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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

                  <div className="flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Guardada em {formatDate(job.postedAt)}
                    </span>
                  </div>
                </div>
              </div>

              {!compareMode && (
                <div className="mt-4 flex gap-2 border-t border-border pt-4">
                  <Button variant="outline" size="sm" className="flex-1 gap-1" asChild>
                    <Link to={`/vaga/${job.slug}`}>
                      <ExternalLink className="h-3.5 w-3.5" />
                      Ver vaga
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeJob(job.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {savedJobs.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Nenhuma vaga guardada
            </h3>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Guarde vagas interessantes para candidatar-se mais tarde.
            </p>
            <Button asChild>
              <Link to="/">Explorar Vagas</Link>
            </Button>
          </div>
        )}
      </div>
    </CandidatoLayout>
  );
}
