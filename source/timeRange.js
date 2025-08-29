
export function timeRange(){

    document.addEventListener("click", e =>{

        if (!e.target.classList.contains("customTime__button")){
            return;
        }

        startDate = document.querySelector(".customTime__start").value;
        endDate = document.querySelector(".customTime__end").value;
        
        if (startDate === "") startDate = Object.values(this.data).at(0).Date
        if (endDate === "") endDate = Object.values(this.data).at(-1).Date;
                
        let activedSensors = [...document.querySelectorAll(".showSensors__grid-button--actived")];
        
        for (let actSensor of activedSensors){

            actSensor.dispatchEvent(new CustomEvent("click", {
                bubbles:true,
                detail:{
                    NotToggled:true, // не переключаем датчик 
                }
            }));

        }
    })
}