import { Link } from "react-router-dom";

const Button = ({ filled, text, to, active = true }) => {
  return (
    <>
      <Link to={to ? `/${to}` : false}>
        <button
          className={
            filled
              ? `${
                  active ? "button-fill" : "button-fill-disabled"
                }  w-[250px] py-[14px] whitespace-nowrap`
              : "button-transparent w-[250px] py-[14px] whitespace-nowrap"
          }
        >
          <p className="inter-400">{text}</p>
        </button>
      </Link>
    </>
  );
};

export default Button;
