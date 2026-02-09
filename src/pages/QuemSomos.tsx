import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileNavigation } from '@/components/MobileNavigation';
import { Users, Target, Heart, Award } from 'lucide-react';

const QuemSomos = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Quem Somos
            </h1>
            <p className="text-lg text-muted-foreground">
              A principal plataforma de emprego em Moçambique, conectando talentos às melhores oportunidades.
            </p>
          </div>

          {/* Mission */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-foreground">A Nossa Missão</h2>
            <p className="leading-relaxed text-muted-foreground">
              O JobCV nasceu com o objectivo de revolucionar o mercado de trabalho em Moçambique, 
              tornando o processo de busca de emprego mais acessível, transparente e eficiente. 
              Acreditamos que todos merecem acesso às melhores oportunidades de carreira, 
              independentemente da sua localização ou experiência.
            </p>
          </section>

          {/* Values */}
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-semibold text-foreground">Os Nossos Valores</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Transparência</h3>
                <p className="text-sm text-muted-foreground">
                  Informações claras sobre vagas, salários e processos de candidatura.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Inclusão</h3>
                <p className="text-sm text-muted-foreground">
                  Oportunidades para todos, valorizando a diversidade e o talento local.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Compromisso</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicados ao sucesso dos candidatos e ao crescimento das empresas.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Excelência</h3>
                <p className="text-sm text-muted-foreground">
                  Plataforma moderna e intuitiva, sempre a evoluir para melhor servir.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Contacte-nos</h2>
            <p className="mb-4 text-muted-foreground">
              Tem dúvidas ou sugestões? Estamos aqui para ajudar.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Email:</strong> info@jobcv.co.mz</p>
              <p><strong className="text-foreground">Telefone:</strong> +258 84 000 0000</p>
              <p><strong className="text-foreground">Endereço:</strong> Maputo, Moçambique</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default QuemSomos;
