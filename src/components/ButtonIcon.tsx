import React from 'react';
import type { IconType } from 'react-icons';

interface ButtonIconProps {
  icon: IconType;
  size?: number;
  color?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon: Icon,
  size = 24,
  color = 'var(--color-white)',
  onClick,
  className,
  style,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        background: 'none',
        border: 'none',
        outline: 'none',
        padding: 0,
        margin: 0,
        cursor: onClick ? 'pointer' : 'default',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        ...style,
      }}
    >
      <Icon size={size} />
    </button>
  );
};
