import React from 'react';
import logoIcon from '../assets/logo-icon.png';
import logoHorizDark from '../assets/logo-horizontal-dark.png';
import logoHorizLight from '../assets/logo-horizontal-light.png';
import logoVertDark from '../assets/logo-vertical-dark.png';
import logoVertLight from '../assets/logo-vertical-light.png';

/**
 * InternCatalyst Official Logo Component
 * Accepts variant ('horizontal', 'vertical', 'icon', 'image'), mode ('dark', 'light'), height, showTagline, onClick.
 */
export default function Logo({ 
  variant = 'horizontal', 
  mode = 'dark', 
  height = 42, 
  showTagline = true, 
  onClick, 
  className = '',
  style = {} 
}) {
  const isDark = mode === 'dark';
  
  if (variant === 'icon') {
    return (
      <div 
        onClick={onClick} 
        className={`brand-logo-wrapper ${className}`}
        style={{ display: 'inline-flex', alignItems: 'center', cursor: onClick ? 'pointer' : 'default', ...style }}
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
        onClick={onClick} 
        className={`brand-logo-wrapper ${className}`}
        style={{ display: 'inline-flex', alignItems: 'center', cursor: onClick ? 'pointer' : 'default', ...style }}
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
        onClick={onClick} 
        className={`brand-logo-wrapper vertical ${className}`}
        style={{ 
          display: 'inline-flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          cursor: onClick ? 'pointer' : 'default',
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
  const accentColor = isDark ? '#38bdf8' : '#0284c7';
  const tagColor = isDark ? '#06b6d4' : '#0284c7';

  const iconHeight = height;
  const fontSizeTitle = Math.max(14, height * 0.52);
  const fontSizeTagline = Math.max(9, height * 0.25);

  return (
    <div 
      onClick={onClick} 
      className={`brand-logo-wrapper horizontal ${className}`}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: `${Math.max(8, height * 0.22)}px`, 
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
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
          filter: 'drop-shadow(0 2px 10px rgba(6, 182, 212, 0.4))'
        }} 
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, whiteSpace: 'nowrap' }}>
        <div style={{ 
          fontSize: `${fontSizeTitle}px`, 
          fontWeight: '800', 
          letterSpacing: '-0.03em', 
          color: textColor,
          lineHeight: '1.05',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          whiteSpace: 'nowrap'
        }}>
          Intern<span style={{ color: accentColor }}>Catalyst</span>
        </div>
        {showTagline && (
          <div style={{ 
            fontSize: `${fontSizeTagline}px`, 
            fontWeight: '600',
            color: tagColor, 
            letterSpacing: '0.01em',
            marginTop: '1px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            whiteSpace: 'nowrap'
          }}>
            Accelerate Your Career
          </div>
        )}
      </div>
    </div>
  );
}
