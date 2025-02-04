import Image from 'next/image';
import PropTypes from 'prop-types';

const AppLogo = ({
  type = "dark",
  alt = 'Logo',
  width = undefined,
  height = undefined,
  className = '',
  isOptimized = false,
}) => {
  if (isOptimized) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <Image
          src={`/logo/logo-${type}.svg`}
          alt={alt}
          fill={!width && !height}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    );
  }

  return (
    <img
      src={`/logo/logo-${type}.svg`}
      alt={alt}
      className={className}
      style={{ width, height }}
    />
  );
};

AppLogo.propTypes = {
  type: "light" | "dark",
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  isOptimized: PropTypes.bool,
};

export default AppLogo;
