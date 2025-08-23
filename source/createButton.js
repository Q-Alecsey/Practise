
// Сетка , где отображаются все приборы
const grid = document.querySelector(".dataBlock__device-grid");

// Графический блок , где отображаются датчики и график
const graphicBlock = document.querySelector(".graphicBlock");

export function createButton(el) {
    const btn = document.createElement("button");
    btn.classList.add("dataBlock__device-button");
    btn.textContent = el;

    grid.append(btn);
}


// Шаблон для создания датчиков у прибора
const getPatternSensors = (e, data) => {    

    const section = document.createElement("section");
    section.classList.add("showSensors");

    const titleForSection = document.createElement("h2");
    titleForSection.classList.add("showSensors__title");
    titleForSection.textContent = e.target.textContent;

    section.append(titleForSection);   
    
    const gridForSensors = document.createElement("div");
    gridForSensors.classList.add("showSensors__grid");
    
    section.append(gridForSensors);   

    for (let item in data){  

        if (data[item].uName === e.target.textContent){

            const sensors = data[item].data;
            
            for (const sensor in sensors){

                let sensorButton = document.createElement("button");
                sensorButton.classList.add("showSensors__grid-button");
                sensorButton.textContent = sensor;

                gridForSensors.append(sensorButton);
            }      
                        
            return section;
        }
    }
}


// Подключение кнопок к EventListener для отображения датчиков
// (а также их отключение)

export function EventListenerForButtons(data) {

    document.addEventListener("click", (e) => {

        if (!e.target.classList.contains("dataBlock__device-button")) {
            return;
        }

        const button = e.target;
        button.classList.toggle("dataBlock__device-button--actived");

        console.log(button);
        
        if (button.classList.contains("dataBlock__device-button--actived")){
            
            graphicBlock.prepend(getPatternSensors(e, data));
        }        

        else{

            [...document.querySelectorAll(".showSensors")].forEach((el) =>{
                
                if (button.textContent === el.firstChild.textContent)
                    el.remove();
            })
        }
    })
}
