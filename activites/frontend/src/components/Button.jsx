import "..components/Button.css";
const Button = ({ variant = "primary" }) => {
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
