import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Empresas from "./pages/Empresas";
import NotFound from "./pages/NotFound";
import VagaDetalhes from "./pages/VagaDetalhes";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVagas from "./pages/admin/AdminVagas";
import AdminVagaForm from "./pages/admin/AdminVagaForm";
import AdminEmpresas from "./pages/admin/AdminEmpresas";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminCandidaturas from "./pages/admin/AdminCandidaturas";
import AdminConfiguracoes from "./pages/admin/AdminConfiguracoes";

// Empresa Pages
import EmpresaDashboard from "./pages/empresa/EmpresaDashboard";
import EmpresaVagas from "./pages/empresa/EmpresaVagas";

// Candidato Pages
import CandidatoDashboard from "./pages/candidato/CandidatoDashboard";
import CandidatoCandidaturas from "./pages/candidato/CandidatoCandidaturas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vaga/:slug" element={<VagaDetalhes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/vagas" element={<AdminVagas />} />
          <Route path="/admin/vagas/nova" element={<AdminVagaForm />} />
          <Route path="/admin/vagas/:id/editar" element={<AdminVagaForm />} />
          <Route path="/admin/empresas" element={<AdminEmpresas />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/blog/novo" element={<AdminVagaForm />} />
          <Route path="/admin/candidaturas" element={<AdminCandidaturas />} />
          <Route path="/admin/configuracoes" element={<AdminConfiguracoes />} />
          
          {/* Empresa Routes */}
          <Route path="/empresa/dashboard" element={<EmpresaDashboard />} />
          <Route path="/empresa/vagas" element={<EmpresaVagas />} />
          <Route path="/empresa/vagas/nova" element={<AdminVagaForm />} />
          <Route path="/empresa/candidaturas" element={<AdminCandidaturas />} />
          
          {/* Candidato Routes */}
          <Route path="/candidato/dashboard" element={<CandidatoDashboard />} />
          <Route path="/candidato/candidaturas" element={<CandidatoCandidaturas />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
