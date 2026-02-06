import { useState } from 'react';
import { Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Job } from '@/types/job';

interface QuickApplyButtonProps {
  job: Job | null;
}

export function QuickApplyButton({ job }: QuickApplyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuickApply = () => {
    // Simulate quick apply
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating Quick Apply Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-105 active:scale-95 md:hidden"
        aria-label="Candidatura rápida"
      >
        <Zap className="h-6 w-6 text-primary-foreground" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-sm">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-badge-remote/10">
                <CheckCircle className="h-8 w-8 text-badge-remote" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Candidatura Enviada!
              </h3>
              <p className="text-center text-sm text-muted-foreground">
                A sua candidatura rápida foi enviada com sucesso.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Candidatura Rápida</DialogTitle>
                <DialogDescription>
                  Candidate-se instantaneamente usando o seu perfil guardado.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <h4 className="mb-2 font-medium text-foreground">O seu perfil:</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>João Manuel Sitoe</p>
                    <p>joao.sitoe@email.com</p>
                    <p>+258 84 123 4567</p>
                  </div>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">CV Boost Activo</h4>
                      <p className="text-sm text-muted-foreground">
                        O seu CV está destacado para recrutadores.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleQuickApply}
                >
                  <Zap className="h-4 w-4" />
                  Enviar Candidatura Rápida
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Ao candidatar-se, concorda com os nossos termos de uso.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
