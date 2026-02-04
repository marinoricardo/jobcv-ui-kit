import { useState } from 'react';
import { Upload, User, Mail, FileText, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Job } from '@/types/job';

interface ApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ job, isOpen, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    cvFile: null as File | null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '', cvFile: null });
      onClose();
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, cvFile: file }));
    }
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-badge-remote/10">
              <CheckCircle className="h-8 w-8 text-badge-remote" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Candidatura Enviada!
            </h3>
            <p className="text-center text-sm text-muted-foreground">
              Sua candidatura para {job.title} foi enviada com sucesso.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Candidatar-se</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {job.title} • {job.company}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Nome completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Currículo (PDF)
                </Label>
                <div className="relative">
                  <Input
                    id="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="cv"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/50"
                  >
                    <Upload className="h-5 w-5" />
                    {formData.cvFile ? (
                      <span className="text-foreground">{formData.cvFile.name}</span>
                    ) : (
                      <span>Arraste seu CV ou clique para selecionar</span>
                    )}
                  </label>
                  {formData.cvFile && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, cvFile: null }))
                      }
                      className="absolute right-2 top-2 rounded-full p-1 hover:bg-muted"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Mensagem (opcional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Conte um pouco sobre você..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <Button type="submit" variant="apply" size="lg" className="flex-1">
                  Enviar Candidatura
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={onClose}>
                  Cancelar
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
