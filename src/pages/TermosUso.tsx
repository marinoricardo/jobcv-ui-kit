import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileNavigation } from '@/components/MobileNavigation';

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Termos de Uso
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Última actualização: Janeiro 2024
          </p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">1. Aceitação dos Termos</h2>
              <p className="leading-relaxed">
                Ao aceder e utilizar a plataforma JobCV, você concorda em cumprir e estar vinculado 
                a estes Termos de Uso. Se não concordar com qualquer parte destes termos, 
                não deverá utilizar os nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">2. Descrição do Serviço</h2>
              <p className="leading-relaxed">
                O JobCV é uma plataforma online que conecta candidatos a oportunidades de emprego 
                em Moçambique. Oferecemos serviços de publicação de vagas, gestão de candidaturas 
                e ferramentas de recrutamento para empresas.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">3. Registo e Conta</h2>
              <p className="leading-relaxed">
                Para aceder a determinadas funcionalidades, poderá ser necessário criar uma conta. 
                Você é responsável por manter a confidencialidade das suas credenciais e por todas 
                as actividades que ocorram na sua conta.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">4. Uso Aceitável</h2>
              <p className="mb-3 leading-relaxed">Ao utilizar o JobCV, você concorda em:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Fornecer informações verdadeiras e actualizadas</li>
                <li>Não publicar conteúdo ofensivo, discriminatório ou ilegal</li>
                <li>Não utilizar a plataforma para fins fraudulentos</li>
                <li>Respeitar a privacidade de outros utilizadores</li>
                <li>Não interferir com o funcionamento da plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">5. Propriedade Intelectual</h2>
              <p className="leading-relaxed">
                Todo o conteúdo da plataforma, incluindo logotipos, textos, gráficos e software, 
                é propriedade do JobCV ou dos seus licenciadores e está protegido por leis de 
                propriedade intelectual.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">6. Limitação de Responsabilidade</h2>
              <p className="leading-relaxed">
                O JobCV não garante que as informações publicadas nas vagas sejam exactas ou 
                actualizadas. Não nos responsabilizamos por decisões tomadas com base nas 
                informações disponíveis na plataforma.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">7. Modificações</h2>
              <p className="leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                As alterações entram em vigor imediatamente após a publicação. 
                O uso continuado da plataforma constitui aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">8. Contacto</h2>
              <p className="leading-relaxed">
                Para questões sobre estes Termos de Uso, contacte-nos através do email: 
                <a href="mailto:legal@jobcv.co.mz" className="ml-1 text-primary hover:underline">
                  legal@jobcv.co.mz
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default TermosUso;
