import { render } from "@testing-library/react";

export default function CardsetBase({cardDefs, cards, faceUp, active, name, activeTest, additionalClassName, renderActiveCards, renderInactiveCards, playerName, gameStateSetter}) {
    if (!cards) {
        return (<span></span>);
    }
    
    let cardList;
    if (faceUp){            
        cardList = <ul className={"card-set-" + (active ? "active" : "inactive")}>
            {active ? renderActiveCards(cardDefs, cards, activeTest, playerName, gameStateSetter) : renderInactiveCards(cardDefs, cards)}
        </ul>                                
    }
    else{
        cardList = <span class="card-set-facedown">{cards.length} cards</span>
    }

    return (
        <div className={"card-set " + additionalClassName}>
            <h2>{name}</h2>
            {cardList}
        </div>
    );
}