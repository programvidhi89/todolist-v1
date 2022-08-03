 
 module.exports.getDate = function (){
    const today = new Date();
        const options = {
            weekday:'long',
            year:'numeric',
            month:'long',
            day:'numeric'
    
        }
        const day = today.toLocaleDateString("en-US",options);
        return day;
    
    }
    module.exports.text =  function text(){
        return "Welcome to my list";
    }
 