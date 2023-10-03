import { useState, useEffect } from "react";
import Card from "./Card";
import "./Table.css";
const BASE_URL = "https://deckofcardsapi.com/api/deck";

/** Table: card table
 *
 * state:
 * - deck: { id, remaining }
 * - cards: [{card info}, ...]
 * - isShuffling : boolean
 * -
 *
 * App->Table->Card
 */
function Table() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const unDrawable = (isShuffling || deck?.remaining === 0);
  const unShuffleable = (!deck || isShuffling);

  //Get Deck on load
  useEffect(() => {
    async function getDeck() {
      const response = await fetch(`${BASE_URL}/new/shuffle`);
      const deckData = await response.json();

      setDeck({ id: deckData.deck_id, remaining: deckData.remaining });
    }
    getDeck();
  }, []);

  //Draw card (callback for draw button)
  async function drawCard() {
    const response = await fetch(`${BASE_URL}/${deck.id}/draw`);
    const drawData = await response.json();

    setCards(curr => [...curr, ...drawData.cards]);
    setDeck(curr => ({ ...curr, remaining: drawData.remaining }));

    if (drawData.remaining === 0) {
      alert("No cards remaining!");
    }
  }

  //Shuffle deck and clear cards (callback for shuffle button)
  async function shuffleDeck() {
    setIsShuffling(true);
    setCards([]);

    await fetch(`${BASE_URL}/${deck.id}/shuffle`);

    setIsShuffling(false);
    setDeck(curr => ({ ...curr, remaining: 52 }));
  }

  return (
    <div className="Table">
      <button onClick={drawCard} disabled={unDrawable}>Draw a Card</button>
      <p>{deck ? `${deck.remaining} cards remaining in deck ${deck.id}` : ""}</p>
      <button onClick={shuffleDeck} disabled={unShuffleable}>Shuffle Deck</button>
      <div className="Table-card-area">
        {cards.map(c => <Card key={c.code} card={c} />)}
      </div>
    </div>
  );
}

export default Table;
