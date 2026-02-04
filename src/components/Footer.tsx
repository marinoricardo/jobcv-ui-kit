import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none text-foreground">JobCV</span>
                <span className="text-[10px] font-medium text-muted-foreground">Moçambique</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A principal plataforma de emprego em Moçambique, conectando talentos às melhores oportunidades.
            </p>
          </div>

          {/* Para Candidatos */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Para Candidatos
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Buscar Vagas
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Criar Currículo
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground transition-colors hover:text-primary">
                  Dicas de Carreira
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
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
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Publicar Vaga
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Buscar Talentos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Planos e Preços
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Suporte
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Sobre</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© 2024 JobCV Moçambique. Todos os direitos reservados.</p>
          <p>Feito com ❤️ em Maputo</p>
        </div>
      </div>
    </footer>
  );
}
