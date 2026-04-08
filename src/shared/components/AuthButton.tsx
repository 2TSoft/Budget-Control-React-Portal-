import { useEffect, useRef, useState } from 'react';

// Kiểu dữ liệu Power Pages user context (inject bởi portal runtime)
interface PowerPagesUser {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  contactid?: string;
}

declare global {
  interface Window {
    Microsoft?: {
      Dynamic365?: {
        Portal?: {
          User?: PowerPagesUser;
        };
      };
    };
    shell?: {
      getTokenDeferred: () => Promise<string>;
    };
  }
}

const TENANT_ID = import.meta.env.VITE_TENANT_ID as string | undefined;

function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export function AuthButton() {
  const portalUser = window.Microsoft?.Dynamic365?.Portal?.User;
  const isAuthenticated = (portalUser?.userName ?? '') !== '';

  const firstName = portalUser?.firstName ?? '';
  const lastName = portalUser?.lastName ?? '';
  const email = portalUser?.email ?? '';

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const loginFormRef = useRef<HTMLFormElement>(null);

  // Lấy antiforgery token từ Power Pages shell để dùng cho POST login
  useEffect(() => {
    window.shell?.getTokenDeferred()
      .then(setToken)
      .catch(() => {
        // Bỏ qua nếu shell chưa sẵn sàng
      });
  }, []);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogin() {
    loginFormRef.current?.submit();
  }

  function handleLogout() {
    window.location.href = '/Account/Login/LogOff?returnUrl=%2F';
  }

  // ── Chưa đăng nhập ──────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <>
        {/* POST form ẩn — Power Pages yêu cầu antiforgery token */}
        <form
          ref={loginFormRef}
          action="/Account/Login/ExternalLogin"
          method="post"
          style={{ display: 'none' }}
        >
          <input name="__RequestVerificationToken" type="hidden" value={token} />
          {TENANT_ID && (
            <input name="provider" type="hidden" value={`https://login.windows.net/${TENANT_ID}/`} />
          )}
          <input name="returnurl" type="hidden" value={window.location.pathname + window.location.search + window.location.hash} />
        </form>
        <button className="auth-login-btn" onClick={handleLogin} type="button">
        <span className="auth-login-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </span>
        Đăng nhập
        </button>
      </>
    );
  }

  // ── Đã đăng nhập ────────────────────────────────────────
  return (
    <div className="auth-user-wrapper" ref={dropdownRef}>
      <button
        className="auth-avatar-btn"
        onClick={() => setOpen((v) => !v)}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        title={`${firstName} ${lastName}`.trim()}
      >
        <span className="auth-avatar">{getInitials(firstName, lastName)}</span>
        <span className="auth-username">{firstName || lastName}</span>
        <svg
          className={`auth-chevron ${open ? 'auth-chevron--open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="auth-dropdown">
          <div className="auth-dropdown-header">
            <span className="auth-dropdown-avatar">{getInitials(firstName, lastName)}</span>
            <div className="auth-dropdown-info">
              <span className="auth-dropdown-name">{`${firstName} ${lastName}`.trim()}</span>
              {email && (
                <span className="auth-dropdown-email">{email}</span>
              )}
            </div>
          </div>
          <div className="auth-dropdown-divider" />
          <button className="auth-logout-btn" onClick={handleLogout} type="button">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
