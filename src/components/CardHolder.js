import { useEffect, useState } from 'react';
import Card from './Card';
// need to mpa them to cards then print them in div
function CardHolder (props){
   const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState(); 
  const [choosenCard, setChoosenCard] = useState(); 
  const [listCards, setlistCards] = useState();
  const [firstCardPick, setFirstCardPick] = useState();
  const[rounds, setRounds] =useState(1)
  let secondCardPick = ""
  

 
  async function getData() {
    setLoading(true);
    const res = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await res.json();
    setDeck(data);
    setLoading(false)
  }

  useEffect(() => {
    
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
          Object.assign(finalCardList[i], {activeCardImage:finalCardList[i].backGroundCardImage});
          Object.assign(finalCardList[i], {isDisabled: false});
        }
        setlistCards(finalCardList);
        
        
}
    if (typeof(deck) !== 'undefined'){
      console.log(deck)
      getPlayCards();
    }else{
    
    }
  }, [deck])

  
  useEffect(() =>{
    
  },[choosenCard])

  function compareCards (){
  
    if (firstCardPick.value ==secondCardPick.value && firstCardPick.suit == secondCardPick.suit && firstCardPick.id !==secondCardPick.id){
      return true
    }else{
      return false
    }
   
  }
  function runGame(id){
    
    
    let tempArray = []
    for (let i = 0;i<listCards.length;i++){
      if(listCards[i].id === id){
        if(typeof(firstCardPick) === 'undefined'){
          
          setFirstCardPick(listCards[i]);
        }else{
          
          secondCardPick = listCards[i];
          
        }
        listCards[i].activeCardImage = listCards[i].image
        tempArray.push(listCards[i]);
        
      }
      else{
        tempArray.push(listCards[i]);
      }
    }
    setlistCards(tempArray);

    if(typeof(firstCardPick) !== 'undefined' && secondCardPick !== ''){
      let tempArray2 = []
      if(compareCards()){
          firstCardPick.isDisabled = true
          secondCardPick.isDisabled = true;
          
          setFirstCardPick()
          secondCardPick = "";
      }else {
        
        setTimeout(function(){
         
            
          for(let i = 0;i<listCards.length;i++){
            if(listCards[i].id == firstCardPick.id  || listCards[i].id == secondCardPick.id ){
              listCards[i].activeCardImage = listCards[i].backGroundCardImage
              tempArray2.push(listCards[i])
            }else{
                tempArray2.push(listCards[i])
            }
           
            
          }
          setlistCards(tempArray2);
          setFirstCardPick()
          secondCardPick = "";
        },500);
       
        
        
      }
     
      let gameisOver = true
      for(let i = 0;i<listCards.length;i++){
          if(listCards[i].activeCardImage == listCards[i].backGroundCardImage){gameisOver =false}
      }
      setRounds(rounds +1);
      console.log(rounds);
      if(gameisOver){
        alert("game is over it took:" + rounds + " rounds!");
      }
      
     
    }
    
    
    
    // saves firstcard then next time its called saves second card then compares trough component id if true 

}

function restartGame (){
  getData()
  setRounds(1)
 
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
 
if (loading) return <div>loading..</div>;
if (!deck) return <div>error!!</div>;
if (typeof(listCards) === 'undefined') return <div>error!</div>

//const choosenCardStatus = choosenCard
return(
    
    <div className="gameWindow">
        
        <div id="cardWindow" className="cardHolder">{
        listCards.map((card) =>(
            <Card
              isDisabled = {card.isDisabled}
              cardId = {card.id}
              compareCards = {runGame}
              activeCardImage = {card.activeCardImage}
            />
        ))}
        </div>
        <button id = "restartGameButton" onClick = {restartGame}>Start over</button>
    </div>
)
}





export default CardHolder;