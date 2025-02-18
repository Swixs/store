import { useNavigate } from "react-router-dom";

const NavigationButton = ({ to, children, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default NavigationButton;
