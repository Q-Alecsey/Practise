
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

    // датчики , созданные кнопками
    let groupSensors = {};
    
    document.addEventListener("click", (e) => {
        
        if (!e.target.classList.contains("dataBlock__device-button")) {
            return;
        }

        const button = e.target;
        button.classList.toggle("dataBlock__device-button--actived");

        // активация данной кнопки

        if (button.classList.contains("dataBlock__device-button--actived")){
            
            let patternSensors = getPatternSensors(e, data);
            groupSensors[button.textContent] = patternSensors;
            
            graphicBlock.prepend(patternSensors);
        }        

        else{

            // деактивация данной кнопки
            groupSensors[button.textContent].querySelectorAll(".showSensors__grid-button").forEach( sensor => {                
                
                if (sensor.classList.contains("showSensors__grid-button--actived")){

                    const datasets = chart.data.datasets;

                    for (let i = 0; i < datasets.length; i ++){

                        if (datasets[i].label === sensor.textContent){

                            colorsForGraphic[datasets[i].borderColor] = false;
                            
                            datasets.splice(i, 1);                            
                        }
                    }
                }   
            })

            document.querySelectorAll(".showSensors").forEach((el) =>{
                
                if (button.textContent === el.firstChild.textContent)
                    el.remove();
            });            


            delete groupSensors[button.textContent];

            if (Object.values(colorsForGraphic).every(el => el === false))
                 chart.data.labels = null;
            
            chart.update();
            
        }
    })
}
