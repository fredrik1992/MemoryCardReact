function Card (props){
    console.log(props.cardImage);
    
    //need to add it so image is shown if it exist otherwhise show backgrund
   
    return(

        <div className="card">
            
           <img onClick = {props.compareCards}  className="cardImage" src = {props.backGroundCardImage} />
           

    <button onClick = {() => {
        props.compareCards(props.cardId)
    }
    }></button>        
    </div>
    
    )
}
    


export default Card;