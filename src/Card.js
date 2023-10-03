import "./Card.css";

/** Card: playing card
 *
 * props:
 * card: { code, image, images, value, suit }
 */
function Card({ card }) {
  return (
    <div className="Card">
      <img src={card.image} alt={`${card.value} of ${card.suit}`} />
    </div>
  );
}

export default Card;
