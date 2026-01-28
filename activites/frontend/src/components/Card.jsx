const Card = ({ title }) => {
  return (
    <div className="card-container">
      <div className="card">
        {title && <h2 className="card-title">{title}</h2>}
      </div>
    </div>
  );
};
export default Card;
