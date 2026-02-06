import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Building2, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Básico',
    description: 'Ideal para pequenas empresas',
    price: '2.500',
    period: '/mês',
    features: [
      '5 vagas activas por mês',
      'Visualização de candidaturas',
      'Perfil básico da empresa',
      'Suporte por email',
    ],
    cta: 'Começar Grátis',
    popular: false,
  },
  {
    name: 'Profissional',
    description: 'Para empresas em crescimento',
    price: '7.500',
    period: '/mês',
    features: [
      '20 vagas activas por mês',
      'Vagas destacadas (3/mês)',
      'Perfil premium da empresa',
      'Filtros avançados de candidatos',
      'Analytics básico',
      'Suporte prioritário',
    ],
    cta: 'Subscrever Agora',
    popular: true,
  },
  {
    name: 'Empresarial',
    description: 'Para grandes organizações',
    price: '15.000',
    period: '/mês',
    features: [
      'Vagas ilimitadas',
      'Vagas destacadas ilimitadas',
      'Perfil premium + vídeo',
      'Acesso directo a CVs',
      'Analytics avançado',
      'API de integração',
      'Gestor de conta dedicado',
    ],
    cta: 'Falar com Vendas',
    popular: false,
  },
];

const candidatePlans = [
  {
    name: 'Grátis',
    price: '0',
    features: [
      'Candidaturas ilimitadas',
      'Perfil básico',
      'Alertas de vagas (3/mês)',
      'Guardar vagas favoritas',
    ],
  },
  {
    name: 'CV Boost',
    price: '500',
    period: '/mês',
    features: [
      'Perfil destacado para recrutadores',
      'Aparecer no topo das pesquisas',
      'Selo de candidato verificado',
      'Alertas ilimitados',
      'Ver quem viu o seu perfil',
      'Dicas personalizadas de carreira',
    ],
    popular: true,
  },
];

export default function Precos() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-accent/40 to-background py-16">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Zap className="h-3 w-3" />
            Planos Flexíveis
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Escolha o plano certo para si
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Seja empresa ou candidato, temos opções que se adaptam às suas necessidades.
          </p>
        </div>
      </section>

      <main className="container py-12">
        {/* For Companies */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Para Empresas</h2>
              <p className="text-muted-foreground">Encontre os melhores talentos</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 transition-all ${
                  plan.popular
                    ? 'border-primary bg-card shadow-lg'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                    <Star className="h-3 w-3" /> Mais Popular
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground"> MZN{plan.period}</span>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-badge-remote" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* For Candidates */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge-remote/10">
              <Users className="h-5 w-5 text-badge-remote" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Para Candidatos</h2>
              <p className="text-muted-foreground">Destaque-se dos demais</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:max-w-3xl">
            {candidatePlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 transition-all ${
                  plan.popular
                    ? 'border-primary bg-card shadow-lg'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                    <Zap className="h-3 w-3" /> Recomendado
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground"> MZN{plan.period || ''}</span>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-badge-remote" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.popular ? 'Activar CV Boost' : 'Criar Conta Grátis'}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent to-primary/5 p-8 md:p-12">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-3xl font-bold text-foreground">85%</span>
              </div>
              <p className="text-muted-foreground">Taxa de sucesso com CV Boost</p>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <span className="text-3xl font-bold text-foreground">10K+</span>
              </div>
              <p className="text-muted-foreground">Candidatos contratados</p>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-3xl font-bold text-foreground">200+</span>
              </div>
              <p className="text-muted-foreground">Empresas parceiras</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
