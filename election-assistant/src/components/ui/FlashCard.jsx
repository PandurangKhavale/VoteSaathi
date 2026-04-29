import PropTypes from 'prop-types';

export default function FlashCard({
  front,
  back,
  className = '',
  frontClassName = '',
  backClassName = '',
}) {
  return (
    <div className={`flip-card ${className}`}>
      <div className="flip-card-inner relative h-full">
        {/* Front */}
        <div className={`flip-card-front h-full ${frontClassName}`}>
          {front}
        </div>

        {/* Back */}
        <div className={`flip-card-back h-full ${backClassName}`}>
          {back}
        </div>
      </div>
    </div>
  );
}

FlashCard.propTypes = {
  front: PropTypes.node.isRequired,
  back: PropTypes.node.isRequired,
  className: PropTypes.string,
  frontClassName: PropTypes.string,
  backClassName: PropTypes.string,
};
