 import { useState } from 'react';
 import { Link, useNavigate } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { 
   Briefcase, 
   Mail, 
   Lock, 
   User, 
   Building2, 
   Eye, 
   EyeOff,
   ArrowRight,
   CheckCircle2
 } from 'lucide-react';
 
 export default function Login() {
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [activeTab, setActiveTab] = useState('login');
 
   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
   const [registerForm, setRegisterForm] = useState({
     name: '',
     email: '',
     password: '',
     confirmPassword: '',
     role: 'candidate' as 'candidate' | 'company',
   });
 
   const handleLogin = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);
     
     // Simulate login - in real app, this would authenticate
     setTimeout(() => {
       setIsLoading(false);
       // Redirect based on mock role
       if (loginForm.email.includes('admin')) {
         navigate('/admin');
       } else if (loginForm.email.includes('empresa')) {
         navigate('/empresa/dashboard');
       } else {
         navigate('/candidato/dashboard');
       }
     }, 1000);
   };
 
   const handleRegister = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);
     
     setTimeout(() => {
       setIsLoading(false);
       if (registerForm.role === 'company') {
         navigate('/empresa/dashboard');
       } else {
         navigate('/candidato/dashboard');
       }
     }, 1000);
   };
 
   return (
     <div className="min-h-screen bg-background flex">
       {/* Left Side - Form */}
       <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
         <div className="mx-auto w-full max-w-md">
           {/* Logo */}
           <Link to="/" className="flex items-center gap-2.5 mb-8 justify-center">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
               <Briefcase className="h-5 w-5 text-primary-foreground" />
             </div>
             <div className="flex flex-col">
               <span className="text-xl font-bold leading-none text-foreground">JobCV</span>
               <span className="text-[10px] font-medium text-muted-foreground">Moçambique</span>
             </div>
           </Link>
 
           <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
             <Tabs value={activeTab} onValueChange={setActiveTab}>
               <TabsList className="grid w-full grid-cols-2 mb-6">
                 <TabsTrigger value="login">Entrar</TabsTrigger>
                 <TabsTrigger value="register">Criar Conta</TabsTrigger>
               </TabsList>
 
               {/* Login Form */}
               <TabsContent value="login">
                 <div className="text-center mb-6">
                   <h1 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h1>
                   <p className="text-muted-foreground mt-1">Entre na sua conta para continuar</p>
                 </div>
 
                 <form onSubmit={handleLogin} className="space-y-4">
                   <div className="space-y-2">
                     <Label htmlFor="login-email">Email</Label>
                     <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input
                         id="login-email"
                         type="email"
                         placeholder="seu@email.com"
                         className="pl-10"
                         value={loginForm.email}
                         onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                         required
                       />
                     </div>
                   </div>
 
                   <div className="space-y-2">
                     <div className="flex items-center justify-between">
                       <Label htmlFor="login-password">Palavra-passe</Label>
                       <Link to="/recuperar-senha" className="text-sm text-primary hover:underline">
                         Esqueceu?
                       </Link>
                     </div>
                     <div className="relative">
                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input
                         id="login-password"
                         type={showPassword ? 'text' : 'password'}
                         placeholder="••••••••"
                         className="pl-10 pr-10"
                         value={loginForm.password}
                         onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                         required
                       />
                       <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                       >
                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                       </button>
                     </div>
                   </div>
 
                   <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? 'A entrar...' : 'Entrar'}
                     {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                   </Button>
                 </form>
 
                 <p className="text-center text-sm text-muted-foreground mt-4">
                   <span className="text-xs">Dica: Use "admin@" para admin, "empresa@" para empresa</span>
                 </p>
               </TabsContent>
 
               {/* Register Form */}
               <TabsContent value="register">
                 <div className="text-center mb-6">
                   <h1 className="text-2xl font-bold text-foreground">Crie a sua conta</h1>
                   <p className="text-muted-foreground mt-1">Comece a sua jornada connosco</p>
                 </div>
 
                 <form onSubmit={handleRegister} className="space-y-4">
                   {/* Role Selection */}
                   <div className="grid grid-cols-2 gap-3">
                     <button
                       type="button"
                       onClick={() => setRegisterForm({ ...registerForm, role: 'candidate' })}
                       className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                         registerForm.role === 'candidate'
                           ? 'border-primary bg-primary/5'
                           : 'border-border hover:border-primary/30'
                       }`}
                     >
                       <User className={`h-6 w-6 ${registerForm.role === 'candidate' ? 'text-primary' : 'text-muted-foreground'}`} />
                       <span className={`text-sm font-medium ${registerForm.role === 'candidate' ? 'text-primary' : 'text-foreground'}`}>
                         Candidato
                       </span>
                     </button>
                     <button
                       type="button"
                       onClick={() => setRegisterForm({ ...registerForm, role: 'company' })}
                       className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                         registerForm.role === 'company'
                           ? 'border-primary bg-primary/5'
                           : 'border-border hover:border-primary/30'
                       }`}
                     >
                       <Building2 className={`h-6 w-6 ${registerForm.role === 'company' ? 'text-primary' : 'text-muted-foreground'}`} />
                       <span className={`text-sm font-medium ${registerForm.role === 'company' ? 'text-primary' : 'text-foreground'}`}>
                         Empresa
                       </span>
                     </button>
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="register-name">
                       {registerForm.role === 'company' ? 'Nome da Empresa' : 'Nome Completo'}
                     </Label>
                     <div className="relative">
                       {registerForm.role === 'company' ? (
                         <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       ) : (
                         <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       )}
                       <Input
                         id="register-name"
                         type="text"
                         placeholder={registerForm.role === 'company' ? 'Empresa XYZ' : 'João Silva'}
                         className="pl-10"
                         value={registerForm.name}
                         onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                         required
                       />
                     </div>
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="register-email">Email</Label>
                     <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input
                         id="register-email"
                         type="email"
                         placeholder="seu@email.com"
                         className="pl-10"
                         value={registerForm.email}
                         onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                         required
                       />
                     </div>
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="register-password">Palavra-passe</Label>
                     <div className="relative">
                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input
                         id="register-password"
                         type={showPassword ? 'text' : 'password'}
                         placeholder="••••••••"
                         className="pl-10 pr-10"
                         value={registerForm.password}
                         onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                         required
                       />
                       <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                       >
                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                       </button>
                     </div>
                   </div>
 
                   <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? 'A criar conta...' : 'Criar Conta'}
                     {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                   </Button>
                 </form>
               </TabsContent>
             </Tabs>
           </div>
 
           <p className="text-center text-sm text-muted-foreground mt-6">
             <Link to="/" className="text-primary hover:underline">
               ← Voltar ao início
             </Link>
           </p>
         </div>
       </div>
 
       {/* Right Side - Image/Branding */}
       <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 items-center justify-center p-12">
         <div className="max-w-md text-center text-primary-foreground">
           <div className="mb-8">
             <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
               <Briefcase className="h-10 w-10" />
             </div>
           </div>
           <h2 className="text-3xl font-bold mb-4">
             A sua carreira começa aqui
           </h2>
           <p className="text-lg opacity-90 mb-8">
             Junte-se a milhares de profissionais e empresas que já encontraram o match perfeito através do JobCV.
           </p>
           <div className="space-y-3">
             <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 backdrop-blur">
               <CheckCircle2 className="h-5 w-5" />
               <span>Acesso a vagas exclusivas</span>
             </div>
             <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 backdrop-blur">
               <CheckCircle2 className="h-5 w-5" />
               <span>Candidaturas simplificadas</span>
             </div>
             <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 backdrop-blur">
               <CheckCircle2 className="h-5 w-5" />
               <span>Alertas de novas oportunidades</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 }