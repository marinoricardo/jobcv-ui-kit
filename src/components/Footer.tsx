import { Briefcase } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">JobCV</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Conectando talentos às melhores oportunidades do mercado.
            </p>
          </div>

          {/* Para Candidatos */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Para Candidatos
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Buscar Vagas
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Criar Currículo
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Dicas de Carreira
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Alertas de Vagas
                </a>
              </li>
            </ul>
          </div>

          {/* Para Empresas */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Para Empresas
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Publicar Vaga
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Buscar Candidatos
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Planos e Preços
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Suporte
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 JobCV. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
