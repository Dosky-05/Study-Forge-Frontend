import React, { useState } from 'react';

const S = {
    wrap: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: '#0d0f1e',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    },
    card: {
        background: '#13162b',
        borderRadius: 24,
        padding: '40px 32px 32px',
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
    },
    tabs: {
        display: 'flex',
        width: '100%',
        background: '#0d0f1e',
        borderRadius: 12,
        padding: 4,
        marginBottom: 32,
    },
    tab: active => ({
        flex: 1,
        padding: '10px 0',
        borderRadius: 8,
        border: 'none',
        background: active ? '#1e2240' : 'transparent',
        color: active ? '#fff' : '#5a607a',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
    }),
    iconWrap: {
        width: 60,
        height: 60,
        borderRadius: 18,
        background: 'linear-gradient(135deg, #4f5ef7, #6c4fff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        marginBottom: 20,
        boxShadow: '0 8px 20px rgba(79, 94, 247, 0.3)',
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 800,
        letterSpacing: '-0.5px',
        marginBottom: 4,
    },
    subtitle: {
        color: '#5a607a',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.05em',
        marginBottom: 32,
        textAlign: 'center',
    },
    fieldWrap: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        color: '#5a607a',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: 8,
        display: 'block',
    },
    inputRow: {
        position: 'relative',
        width: '100%',
    },
    input: focused => ({
        width: '100%',
        background: '#1a1d35',
        border: focused ? '1px solid #4f5ef7' : '1px solid #2d325a',
        borderRadius: 14,
        padding: '14px 44px 14px 16px',
        color: '#fff',
        fontSize: 15,
        outline: 'none',
        fontFamily: 'inherit',
        boxShadow: focused ? '0 0 0 4px rgba(79, 94, 247, 0.1)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
    }),
    inputPlain: focused => ({
        width: '100%',
        background: '#1a1d35',
        border: focused ? '1px solid #4f5ef7' : '1px solid #2d325a',
        borderRadius: 14,
        padding: '14px 16px',
        color: '#fff',
        fontSize: 15,
        outline: 'none',
        fontFamily: 'inherit',
        boxShadow: focused ? '0 0 0 4px rgba(79, 94, 247, 0.1)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
    }),
    eyeBtn: {
        position: 'absolute',
        right: 14,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#5a607a',
        fontSize: 18,
        padding: 4,
        display: 'flex',
        alignItems: 'center',
    },
    submitBtn: (disabled) => ({
        width: '100%',
        background: 'linear-gradient(135deg, #4f5ef7, #6c4fff)',
        color: '#fff',
        border: 'none',
        borderRadius: 50,
        padding: '16px 24px',
        fontSize: 16,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        marginTop: 8,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        boxShadow: '0 4px 15px rgba(79, 94, 247, 0.3)',
        opacity: disabled ? 0.6 : 1,
    }),
    err: {
        color: '#f87171',
        fontSize: 12,
        marginTop: 10,
        background: 'rgba(248, 113, 113, 0.1)',
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid rgba(248, 113, 113, 0.2)',
        width: '100%',
        boxSizing: 'border-box',
    },
    success: {
        color: '#4ade80',
        fontSize: 12,
        marginTop: 10,
        background: 'rgba(74, 222, 128, 0.1)',
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid rgba(74, 222, 128, 0.2)',
        width: '100%',
        boxSizing: 'border-box',
    },
    forgotBtn: {
        background: 'none',
        border: 'none',
        color: '#4f5ef7',
        fontSize: 12,
        cursor: 'pointer',
        fontFamily: 'inherit',
        padding: 0,
        marginTop: 8,
        alignSelf: 'flex-end',
        display: 'block',
        width: '100%',
        textAlign: 'right',
    },
    divider: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        margin: '8px 0',
    },
    dividerLine: {
        flex: 1,
        height: 1,
        background: '#2d325a',
    },
    dividerText: {
        color: '#5a607a',
        fontSize: 12,
    },
    brand: {
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        opacity: 0.6,
    },
};

function FocusInput({ type, placeholder, value, onChange, onKeyDown, autoComplete, spellCheck, style, children }) {
    const [focused, setFocused] = useState(false);
    const hasEye = !!children;
    return (
        <div style={S.inputRow}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                style={hasEye ? S.input(focused) : S.inputPlain(focused)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {children}
        </div>
    );
}

export default function AuthScreen({ onLogin }) {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [err, setErr] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const reset = () => {
        setErr(''); setSuccessMsg('');
        setEmail(''); setPassword('');
        setConfirmPassword(''); setName('');
        setShowPass(false); setShowConfirm(false);
    };

    const switchMode = (m) => { reset(); setMode(m); };

    const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    const handleLogin = async () => {
        setErr(''); setSuccessMsg('');
        if (!email.trim() || !password.trim()) { setErr('Please fill in all fields.'); return; }
        if (!validateEmail(email)) { setErr('Please enter a valid email address.'); return; }
        setLoading(true);
        try {
            // Replace this block with your real auth logic e.g. Firebase, Supabase, etc.
            await new Promise(r => setTimeout(r, 1000));
            onLogin({ email });
        } catch (e) {
            setErr(e.message || 'Login failed. Please try again.');
        }
        setLoading(false);
    };

    const handleSignup = async () => {
        setErr(''); setSuccessMsg('');
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setErr('Please fill in all fields.'); return;
        }
        if (!validateEmail(email)) { setErr('Please enter a valid email address.'); return; }
        if (password.length < 8) { setErr('Password must be at least 8 characters.'); return; }
        if (password !== confirmPassword) { setErr('Passwords do not match.'); return; }
        setLoading(true);
        try {
            // Replace this block with your real auth logic e.g. Firebase, Supabase, etc.
            await new Promise(r => setTimeout(r, 1000));
            setSuccessMsg('Account created! You can now log in.');
            switchMode('login');
        } catch (e) {
            setErr(e.message || 'Signup failed. Please try again.');
        }
        setLoading(false);
    };

    const handleKey = (e) => { if (e.key === 'Enter') mode === 'login' ? handleLogin() : handleSignup(); };

    const isLoginDisabled = loading || !email.trim() || !password.trim();
    const isSignupDisabled = loading || !name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim();

    return (
        <div style={S.wrap}>
            <div style={S.card}>
                <div style={S.iconWrap}>📚</div>
                <div style={S.title}>StudyForge</div>
                <div style={S.subtitle}>Professional AI Academic Suite</div>

                <div style={S.tabs}>
                    <button style={S.tab(mode === 'login')} onClick={() => switchMode('login')}>Login</button>
                    <button style={S.tab(mode === 'signup')} onClick={() => switchMode('signup')}>Sign Up</button>
                </div>

                {mode === 'login' ? (
                    <div style={{ width: '100%' }}>
                        <div style={S.fieldWrap}>
                            <label style={S.label}>Email</label>
                            <FocusInput
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={handleKey}
                                autoComplete="email"
                                spellCheck={false}
                            />
                        </div>

                        <div style={S.fieldWrap}>
                            <label style={S.label}>Password</label>
                            <FocusInput
                                type={showPass ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={handleKey}
                                autoComplete="current-password"
                                spellCheck={false}
                            >
                                <button style={S.eyeBtn} onClick={() => setShowPass(s => !s)} tabIndex={-1} type="button">
                                    {showPass ? '🔒' : '👁'}
                                </button>
                            </FocusInput>
                            <button style={S.forgotBtn} onClick={() => setErr('Password reset coming soon.')}>
                                Forgot password?
                            </button>
                        </div>

                        {err && <div style={S.err}>⚠️ {err}</div>}
                        {successMsg && <div style={S.success}>✓ {successMsg}</div>}

                        <button onClick={handleLogin} style={S.submitBtn(isLoginDisabled)} disabled={isLoginDisabled}>
                            {loading ? 'Signing in...' : 'Sign In →'}
                        </button>
                    </div>
                ) : (
                    <div style={{ width: '100%' }}>
                        <div style={S.fieldWrap}>
                            <label style={S.label}>Full Name</label>
                            <FocusInput
                                type="text"
                                placeholder="Your full name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onKeyDown={handleKey}
                                autoComplete="name"
                                spellCheck={false}
                            />
                        </div>

                        <div style={S.fieldWrap}>
                            <label style={S.label}>Email</label>
                            <FocusInput
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={handleKey}
                                autoComplete="email"
                                spellCheck={false}
                            />
                        </div>

                        <div style={S.fieldWrap}>
                            <label style={S.label}>Password</label>
                            <FocusInput
                                type={showPass ? 'text' : 'password'}
                                placeholder="Min. 8 characters"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={handleKey}
                                autoComplete="new-password"
                                spellCheck={false}
                            >
                                <button style={S.eyeBtn} onClick={() => setShowPass(s => !s)} tabIndex={-1} type="button">
                                    {showPass ? '🔒' : '👁'}
                                </button>
                            </FocusInput>
                        </div>

                        <div style={S.fieldWrap}>
                            <label style={S.label}>Confirm Password</label>
                            <FocusInput
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="Repeat your password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                onKeyDown={handleKey}
                                autoComplete="new-password"
                                spellCheck={false}
                            >
                                <button style={S.eyeBtn} onClick={() => setShowConfirm(s => !s)} tabIndex={-1} type="button">
                                    {showConfirm ? '🔒' : '👁'}
                                </button>
                            </FocusInput>
                        </div>

                        {err && <div style={S.err}>⚠️ {err}</div>}
                        {successMsg && <div style={S.success}>✓ {successMsg}</div>}

                        <button onClick={handleSignup} style={S.submitBtn(isSignupDisabled)} disabled={isSignupDisabled}>
                            {loading ? 'Creating account...' : 'Create Account →'}
                        </button>
                    </div>
                )}
            </div>

            <div style={S.brand}>
                <span style={{ color: '#5a607a', fontSize: 12 }}>Powered by</span>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }}>ANTHROPIC</span>
            </div>
        </div>
    );
}
