import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileNavigation } from '@/components/MobileNavigation';

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Última actualização: Janeiro 2024
          </p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">1. Introdução</h2>
              <p className="leading-relaxed">
                O JobCV está comprometido com a protecção da sua privacidade. Esta política 
                descreve como recolhemos, utilizamos e protegemos as suas informações pessoais 
                quando utiliza a nossa plataforma.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">2. Informações que Recolhemos</h2>
              <p className="mb-3 leading-relaxed">Podemos recolher os seguintes tipos de informação:</p>
              <ul className="list-inside list-disc space-y-2">
                <li><strong className="text-foreground">Dados de identificação:</strong> nome, email, telefone</li>
                <li><strong className="text-foreground">Dados profissionais:</strong> currículo, experiência, formação</li>
                <li><strong className="text-foreground">Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas</li>
                <li><strong className="text-foreground">Dados de candidatura:</strong> vagas a que se candidatou, histórico</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">3. Como Utilizamos os Dados</h2>
              <p className="mb-3 leading-relaxed">Utilizamos as suas informações para:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Facilitar a ligação entre candidatos e empregadores</li>
                <li>Processar candidaturas a vagas de emprego</li>
                <li>Enviar notificações sobre vagas relevantes</li>
                <li>Melhorar a experiência na plataforma</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">4. Partilha de Informações</h2>
              <p className="leading-relaxed">
                Os seus dados pessoais podem ser partilhados com empregadores quando se candidata 
                a uma vaga. Não vendemos nem alugamos as suas informações pessoais a terceiros 
                para fins de marketing.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">5. Segurança dos Dados</h2>
              <p className="leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais para proteger 
                as suas informações contra acesso não autorizado, alteração, divulgação ou 
                destruição.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">6. Os Seus Direitos</h2>
              <p className="mb-3 leading-relaxed">Você tem o direito de:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Aceder aos seus dados pessoais</li>
                <li>Corrigir dados incorrectos ou desactualizados</li>
                <li>Solicitar a eliminação dos seus dados</li>
                <li>Retirar o consentimento para processamento</li>
                <li>Exportar os seus dados</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">7. Cookies</h2>
              <p className="leading-relaxed">
                Utilizamos cookies para melhorar a sua experiência de navegação. 
                Pode gerir as suas preferências de cookies através das definições do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">8. Alterações a Esta Política</h2>
              <p className="leading-relaxed">
                Podemos actualizar esta política periodicamente. Notificaremos sobre alterações 
                significativas através da plataforma ou por email.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">9. Contacto</h2>
              <p className="leading-relaxed">
                Para exercer os seus direitos ou esclarecer dúvidas sobre privacidade, contacte-nos:
                <a href="mailto:privacidade@jobcv.co.mz" className="ml-1 text-primary hover:underline">
                  privacidade@jobcv.co.mz
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

export default PoliticaPrivacidade;
