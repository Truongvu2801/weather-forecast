const WindArrow: React.FC<{ degree: number }> = ({ degree }) => (
  <svg
    className="wind-arrow"
    style={{ transform: `rotate(${degree}deg)` }}
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path d="M12 2L9 9h6L12 2zm0 20l3-7H9l3 7z" />
  </svg>
)

export default WindArrow
