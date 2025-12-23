const Card = ({ children, className = '', style = {} }) => {
  return (
    <div 
      className={`card ${className}`}
      style={{
        ...defaultStyles.card,
        ...style
      }}
    >
      {children}
    </div>
  );
};

const defaultStyles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    border: '1px solid #e2e8f0'
  }
};

export default Card;