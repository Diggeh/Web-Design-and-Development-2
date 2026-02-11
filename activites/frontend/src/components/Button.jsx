import "../styles/Button.css";

const Button = ({ children, variant = "primary", loading, ...props }) => {
  return (
    <button className={`btn btn-${variant}`} disabled={loading} {...props}>
      {loading ? (
        <>
          <span className="Spinner">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
