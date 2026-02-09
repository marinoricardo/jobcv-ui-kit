import { Briefcase, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-foreground">JobCV</span>
            <span className="text-[10px] font-medium text-muted-foreground">Moçambique</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive('/') 
                ? 'bg-accent text-accent-foreground' 
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            Vagas
          </Link>
          <Link
            to="/empresas"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive('/empresas') 
                ? 'bg-accent text-accent-foreground' 
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            Empresas
          </Link>
          <Link
            to="/blog"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive('/blog') 
                ? 'bg-accent text-accent-foreground' 
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            Blog
          </Link>
          <Link
            to="/precos"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive('/precos') 
                ? 'bg-accent text-accent-foreground' 
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            Preços
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                isActive('/') ? 'bg-accent text-accent-foreground' : 'text-foreground'
              }`}
            >
              Vagas
            </Link>
            <Link
              to="/empresas"
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                isActive('/empresas') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              }`}
            >
              Empresas
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                isActive('/blog') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/precos"
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                isActive('/precos') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              }`}
            >
              Preços
            </Link>
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-muted-foreground">Tema</span>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
