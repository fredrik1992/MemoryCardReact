function Card (props){
    console.log(props.cardImage);
    
    //need to add it so image is shown if it exist otherwhise show backgrund
   
    return(

        <div id = {props.cardId}  onClick = {() => {
            if (props.isDisabled){
                console.log("is disabled")
            }else{
                props.compareCards(props.cardId)    
            }
            
        }
        } className="card">
            
            <img   className="cardImage" src = {props.activeCardImage} />
            
           
           

           
    </div>
    
    )
}
    


export default Card;