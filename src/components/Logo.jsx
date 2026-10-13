import React, { useRef } from 'react';
import logoIcon from '../assets/logo-icon.png';
import logoHorizDark from '../assets/logo-horizontal-dark.png';
import logoHorizLight from '../assets/logo-horizontal-light.png';
import logoVertDark from '../assets/logo-vertical-dark.png';
import logoVertLight from '../assets/logo-vertical-light.png';

/**
 * InternCatalyst Official Logo Component
 * Accepts variant ('horizontal', 'vertical', 'icon', 'image'), mode ('dark', 'light'), height, showTagline, onClick, onLongPress.
 */
export default function Logo({ 
  variant = 'horizontal', 
  mode = 'dark', 
  height = 42, 
  showTagline = true, 
  onClick, 
  onLongPress,
  className = '',
  style = {} 
}) {
  const isDark = mode === 'dark';
  const timerRef = useRef(null);
  const isLongPressRef = useRef(false);

  const startPress = () => {
    if (!onLongPress) return;
    isLongPressRef.current = false;
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      if (typeof window !== 'undefined' && window.navigator?.vibrate) {
        try { window.navigator.vibrate(60); } catch (_) {}
      }
      onLongPress();
    }, 1100); // 1.1s hold to open admin portal
  };

  const endPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleClick = (e) => {
    if (isLongPressRef.current) {
      e.preventDefault();
      e.stopPropagation();
      isLongPressRef.current = false;
      return;
    }
    if (onClick) onClick(e);
  };

  const sharedHandlers = {
    onClick: handleClick,
    onMouseDown: startPress,
    onMouseUp: endPress,
    onMouseLeave: endPress,
    onTouchStart: startPress,
    onTouchEnd: endPress,
    onTouchCancel: endPress,
    onContextMenu: (e) => {
      if (onLongPress && isLongPressRef.current) {
        e.preventDefault();
      }
    }
  };
  
  if (variant === 'icon') {
    return (
      <div 
        {...sharedHandlers}
        className={`brand-logo-wrapper ${className}`}
        style={{ display: 'inline-flex', alignItems: 'center', cursor: (onClick || onLongPress) ? 'pointer' : 'default', ...style }}
      >
        <img 
          src={logoIcon} 
          alt="InternCatalyst Icon" 
          style={{ 
            height: `${height}px`, 
            width: 'auto', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 10px rgba(6, 182, 212, 0.35))'
          }} 
        />
      </div>
    );
  }

  if (variant === 'image') {
    const imgSrc = isDark 
      ? (showTagline ? logoHorizDark : logoIcon) 
      : (showTagline ? logoHorizLight : logoIcon);

    return (
      <div 
        {...sharedHandlers}
        className={`brand-logo-wrapper ${className}`}
        style={{ display: 'inline-flex', alignItems: 'center', cursor: (onClick || onLongPress) ? 'pointer' : 'default', ...style }}
      >
        <img 
          src={imgSrc} 
          alt="InternCatalyst Logo" 
          style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }} 
        />
      </div>
    );
  }

  if (variant === 'vertical') {
    const imgSrc = isDark ? logoVertDark : logoVertLight;
    return (
      <div 
        {...sharedHandlers}
        className={`brand-logo-wrapper vertical ${className}`}
        style={{ 
          display: 'inline-flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          cursor: (onClick || onLongPress) ? 'pointer' : 'default',
          ...style 
        }}
      >
        <img 
          src={imgSrc} 
          alt="InternCatalyst Logo" 
          style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }} 
        />
      </div>
    );
  }

  // Default: Hybrid Horizontal (Swoosh Icon PNG + Ultra-crisp typography)
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const accentColor = isDark ? '#38bdf8' : '#2563eb';
  const tagColor = isDark ? '#38bdf8' : '#64748b';

  const iconHeight = height;
  const fontSizeTitle = Math.max(14, height * 0.52);
  const fontSizeTagline = Math.max(9, height * 0.25);

  return (
    <div 
      {...sharedHandlers}
      className={`brand-logo-wrapper horizontal ${className}`}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: `${Math.max(8, height * 0.22)}px`, 
        cursor: (onClick || onLongPress) ? 'pointer' : 'default',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        ...style 
      }}
    >
      <img 
        src={logoIcon} 
        alt="InternCatalyst Logo" 
        style={{ 
          height: `${iconHeight}px`, 
          width: 'auto', 
          objectFit: 'contain',
          flexShrink: 0,
          filter: isDark ? 'drop-shadow(0 2px 10px rgba(96, 165, 250, 0.4))' : 'drop-shadow(0 2px 10px rgba(30, 58, 138, 0.25))'
        }} 
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, whiteSpace: 'nowrap' }}>
        <div 
          className="logo-title"
          style={{ 
            fontSize: `${fontSizeTitle}px`, 
            fontWeight: '800', 
            letterSpacing: '-0.03em', 
            color: textColor,
            lineHeight: '1.05',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            whiteSpace: 'nowrap'
          }}
        >
          Intern<span style={{ color: accentColor }}>Catalyst</span>
        </div>
        {showTagline && (
          <div 
            className="logo-tagline"
            style={{ 
              fontSize: `${fontSizeTagline}px`, 
              fontWeight: '600',
              color: tagColor, 
              letterSpacing: '0.01em',
              marginTop: '1px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              whiteSpace: 'nowrap'
            }}
          >
            Accelerate Your Career
          </div>
        )}
      </div>
    </div>
  );
}
