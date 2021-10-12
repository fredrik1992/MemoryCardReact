import { useEffect, useState } from 'react';
import Card from './Card';
// need to mpa them to cards then print them in div
function CardHolder (props){
    const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState(); 
  const [choosenCard, setChoosenCard] = useState(); 
  const [listCards, setlistCards] = useState();
  const firstCardPick = ""
  const secondCardPick = ""
  

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const data = await res.json();
      setDeck(data);
      setLoading(false)
    }
    getData()
  },[])

  useEffect(() =>{
    async function getPlayCards() {
      let cardList = [];
      var duplicateArray = [];
       const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=5`); // shouyld be able to change this to draw 10
        cardList = await res.json();

        cardList = cardList.cards;
        duplicateArray = JSON.parse(JSON.stringify( cardList ));
        const finalCardList = cardList.concat(duplicateArray);
        shuffle(finalCardList);

        for (let i = 0;i<finalCardList.length;i++){
          Object.assign(finalCardList[i], {id: i});
          Object.assign(finalCardList[i], {backGroundCardImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0BXoWfT_A10v895WuK1RrdoGjVf_xLGfUJg&usqp=CAU"});
        }
        setlistCards(finalCardList);
        console.log(finalCardList);
        
}
    if (typeof(deck) !== 'undefined'){
      console.log(deck)
      getPlayCards();
    }else{
      console.log("is undefined")
    }
  }, [deck])

  
  useEffect(() =>{
    
  },[choosenCard])


  function compareCards(id){
    console.log("in other function");
    
    for (let i = 0;i<listCards.length;i++){
      if(listCards[i].id === id){
        listCards[i].backGroundCardImage = listCards[i].image
        setChoosenCard(listCards[i]);
      }
    }
    console.log(id);
    
    // saves firstcard then next time its called saves second card then compares trough component id if true 

}
 
if (loading) return <div>loading..</div>;
if (!deck) return <div>error!!</div>;
if (typeof(listCards) === 'undefined') return <div>error!</div>

//const choosenCardStatus = choosenCard
return(
    
    <div className="wrapper">
        
        <div id="cardWindow">{
        listCards.map((card) =>(
            <Card
              
              cardId = {card.id}
              compareCards = {compareCards}
              backGroundCardImage = {card.backGroundCardImage}
            />
        ))}
        </div>
    </div>
)
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }




export default CardHolder;