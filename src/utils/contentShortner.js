const contentShortner = (description)=>{
    if(description.length > 100){
        return description.substring(0, 100) + '...';
    }
    return description;
}


export default contentShortner;