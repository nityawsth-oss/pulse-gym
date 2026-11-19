import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Crown,
  Sparkles
} from 'lucide-react';

export default function AuthScreens({ initialRoute = 'login', onAuthSuccess, onBackToLanding }) {
  const [currentRoute, setCurrentRoute] = useState(initialRoute); // 'login' | 'signup' | 'verify-email' | 'forgot-password'
  
  // Login Form
  const [loginEmail, setLoginEmail] = useState('aarav.mehta@irondistrict.in');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [demoRole, setDemoRole] = useState('Owner'); // 'Owner' | 'Front desk' | 'Trainer'
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Signup Form
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    mobile: '',
    workEmail: '',
    gymName: '',
    membersCount: '100 to 500',
    password: '',
    terms: false
  });
  const [signupErrors, setSignupErrors] = useState({});

  // Verify Email (OTP)
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [otpError, setOtpError] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Forgot Password
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Handlers
  const handleRoleChange = (role) => {
    setDemoRole(role);
    if (role === 'Owner') {
      setLoginEmail('aarav.mehta@irondistrict.in');
    } else if (role === 'Front desk') {
      setLoginEmail('rahul.nair@irondistrict.in');
    } else {
      setLoginEmail('karan.malhotra@irondistrict.in');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    setTimeout(() => {
      setLoginLoading(false);
      onAuthSuccess({
        name: demoRole === 'Owner' ? 'Aarav Mehta' : demoRole === 'Front desk' ? 'Rahul Nair' : 'Karan Malhotra',
        email: loginEmail,
        role: demoRole,
        gym: 'Iron District Fitness, Indiranagar'
      });
    }, 500);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!signupForm.terms) errs.terms = 'Please accept the terms of service';
    if (signupForm.mobile.length < 10) errs.mobile = 'Enter valid 10-digit mobile number';
    if (signupForm.password.length < 8) errs.password = 'Password must be at least 8 characters';

    if (Object.keys(errs).length > 0) {
      setSignupErrors(errs);
      return;
    }

    setCurrentRoute('verify-email');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered === '123456') {
      onAuthSuccess({
        name: signupForm.fullName || 'Aarav Mehta',
        email: signupForm.workEmail || 'aarav.mehta@irondistrict.in',
        role: 'Owner',
        gym: signupForm.gymName || 'Iron District Fitness'
      });
    } else {
      setOtpError(true);
      setTimeout(() => setOtpError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col justify-center items-center p-3 sm:p-4 selection:bg-[#D9A441] selection:text-[#14110B]">
      
      {/* Top Bar with Back Link */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-3 sm:mb-4">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1.5 text-xs text-[#7A7367] hover:text-[#14110B] transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>

        <span className="text-[11px] sm:text-xs font-mono text-[#A39C8E] truncate max-w-[180px] sm:max-w-none">
          Pulse GMS • Indiranagar HQ
        </span>
      </div>

      {/* Split Layout Container */}
      <div className="w-full max-w-4xl rounded-2xl bg-[#FFFFFF] border border-[#ECE7DC] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
        
        {/* Left Dark Brand Panel (Desktop only) */}
        <div className="hidden md:flex md:col-span-5 hero-gradient p-8 text-white flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D9A441] flex items-center justify-center font-bold text-sm text-[#14110B]">
                P
              </div>
              <span className="font-semibold text-sm tracking-tight text-white">
                Pulse <span className="text-[#D9A441]">GMS</span>
              </span>
            </div>

            <div className="pt-6 space-y-3">
              <h2 className="font-serif text-3xl font-bold leading-tight">
                Run your fitness studio <br />
                <span className="text-[#D9A441]">with confidence.</span>
              </h2>
              <p className="text-xs text-[#B9B1A0] leading-relaxed">
                The centralized operational platform trusted by 420+ gym owners across India.
              </p>
            </div>

            {/* Three Gold Tick Points */}
            <div className="pt-4 space-y-3 text-xs text-[#F4EFE4]">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D9A441]/20 text-[#D9A441] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Automated Turnstile QR check-in sync</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D9A441]/20 text-[#D9A441] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>4-Step Connected Member Management</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D9A441]/20 text-[#D9A441] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>GST-compliant 18% invoicing & Ledgers</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#7A7367] relative z-10 pt-6 border-t border-[#2A2518]">
            © {new Date().getFullYear()} QodeNexus Technologies
          </div>
        </div>

        {/* Right Light Form Panel */}
        <div className="md:col-span-7 p-5 sm:p-8 md:p-10 flex flex-col justify-center bg-[#FFFFFF]">
          
          {/* ROUTE 1: /login */}
          {currentRoute === 'login' && (
            <div className="space-y-4 sm:space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#14110B] tracking-tight">
                  Sign in to your account
                </h3>
                <p className="text-xs text-[#7A7367] mt-1">
                  Access your gym management dashboard and member records.
                </p>
              </div>

              {/* Demo Role Selector */}
              <div className="p-2.5 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC] space-y-1.5">
                <span className="text-[11px] font-semibold text-[#14110B] block">
                  Select Demo Role to Instant Sign In:
                </span>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {['Owner', 'Front desk', 'Trainer'].map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleChange(role)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                        demoRole === role
                          ? 'bg-[#D9A441] text-[#14110B] shadow-sm'
                          : 'bg-[#FFFFFF] text-[#7A7367] border border-[#DDD6C7]'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-[#FDECEC] border border-[#DC2626]/30 text-[#DC2626] text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-3.5 sm:space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="spec-input w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-[#14110B]">Password</label>
                    <button
                      type="button"
                      onClick={() => setCurrentRoute('forgot-password')}
                      className="text-xs text-[#9A6B12] hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="spec-input w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#7A7367] hover:text-[#14110B]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-[#3A352C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#DDD6C7] accent-[#D9A441]"
                    />
                    <span>Remember me for 30 days</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="btn-primary w-full text-xs font-semibold !h-10 mt-2 shadow-sm"
                >
                  <span>{loginLoading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center text-xs text-[#7A7367] pt-2">
                Don't have an account yet?{' '}
                <button
                  onClick={() => setCurrentRoute('signup')}
                  className="text-[#9A6B12] font-semibold hover:underline"
                >
                  Start free trial
                </button>
              </div>
            </div>
          )}

          {/* ROUTE 2: /signup */}
          {currentRoute === 'signup' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#14110B] tracking-tight">
                  Start your 14-day free trial
                </h3>
                <p className="text-xs text-[#7A7367] mt-0.5">
                  Full access. No credit card required.
                </p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#14110B] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Aarav Mehta"
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                      className="spec-input w-full !h-10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#14110B] mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={signupForm.mobile}
                      onChange={(e) => setSignupForm({ ...signupForm, mobile: e.target.value })}
                      className="spec-input w-full !h-10 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#14110B] mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="aarav@irondistrict.in"
                      value={signupForm.workEmail}
                      onChange={(e) => setSignupForm({ ...signupForm, workEmail: e.target.value })}
                      className="spec-input w-full !h-10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#14110B] mb-1">Gym Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Iron District Fitness"
                      value={signupForm.gymName}
                      onChange={(e) => setSignupForm({ ...signupForm, gymName: e.target.value })}
                      className="spec-input w-full !h-10 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#14110B] mb-1">Members Count</label>
                    <select
                      value={signupForm.membersCount}
                      onChange={(e) => setSignupForm({ ...signupForm, membersCount: e.target.value })}
                      className="spec-input w-full !h-10 text-xs"
                    >
                      <option value="under 100">under 100</option>
                      <option value="100 to 500">100 to 500</option>
                      <option value="500 to 1000">500 to 1000</option>
                      <option value="over 1000">over 1000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#14110B] mb-1">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Min 8 characters"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      className="spec-input w-full !h-10 text-xs"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 pt-1 text-xs text-[#3A352C] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={signupForm.terms}
                    onChange={(e) => setSignupForm({ ...signupForm, terms: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-[#D9A441]"
                  />
                  <span>I agree to the Terms of Service & Privacy Policy</span>
                </label>

                {signupErrors.terms && <p className="text-[11px] text-[#DC2626]">{signupErrors.terms}</p>}

                <button
                  type="submit"
                  className="btn-primary w-full text-xs font-semibold !h-10 mt-1 shadow-sm"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center text-xs text-[#7A7367] pt-1">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentRoute('login')}
                  className="text-[#9A6B12] font-semibold hover:underline"
                >
                  Log in
                </button>
              </div>
            </div>
          )}

          {/* ROUTE 3: /verify-email (OTP 123456) */}
          {currentRoute === 'verify-email' && (
            <div className="space-y-5 text-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#14110B] tracking-tight">
                  Verify your email
                </h3>
                <p className="text-xs text-[#7A7367] mt-1">
                  We've sent a 6-digit verification code to your email.
                </p>
                <span className="text-xs font-mono font-bold text-[#9A6B12] mt-1 block">
                  (Demo code: 123456)
                </span>
              </div>

              {otpError && (
                <div className="p-3 rounded-lg bg-[#FDECEC] border border-[#DC2626]/30 text-[#DC2626] text-xs">
                  Invalid code. Please enter demo code 123456.
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="flex justify-center gap-1.5 sm:gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[idx] = e.target.value;
                        setOtp(newOtp);
                      }}
                      className="w-9 sm:w-11 h-11 sm:h-12 text-center text-base sm:text-lg font-bold rounded-lg border border-[#DDD6C7] bg-[#FFFFFF] focus:border-[#D9A441] focus:outline-none"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-xs font-semibold !h-10 mt-3"
                >
                  <span>Verify Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-xs text-[#7A7367]">
                Resend code in {countdown}s
              </div>
            </div>
          )}

          {/* ROUTE 4: /forgot-password */}
          {currentRoute === 'forgot-password' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#14110B] tracking-tight">
                  Reset Password
                </h3>
                <p className="text-xs text-[#7A7367] mt-1">
                  Enter your registered work email and we'll send a password recovery link.
                </p>
              </div>

              {resetSent ? (
                <div className="p-4 rounded-xl bg-[#E7F7EE] border border-[#16A34A]/30 space-y-2 text-center">
                  <CheckCircle2 className="w-6 h-6 text-[#16A34A] mx-auto" />
                  <p className="text-xs text-[#16A34A] font-medium">
                    Password reset link sent to <strong>{forgotEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setCurrentRoute('login')}
                    className="btn-primary text-xs !h-9 mt-2"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setResetSent(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#14110B] mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="aarav.mehta@irondistrict.in"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="spec-input w-full"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full text-xs font-semibold !h-10"
                  >
                    Send Reset Link
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setCurrentRoute('login')}
                      className="text-xs text-[#7A7367] hover:text-[#14110B]"
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
