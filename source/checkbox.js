
export function connectCheckBox(data){

    document.addEventListener("change", (e) =>{
        
        const activedSensors = [...document.querySelectorAll(".showSensors__grid-button--actived")];

        if (activedSensors.length === 0){

            // Можно что-то добавить!!!!!!!!!!!!!!!!!!!!!!!!!!!
            return;
        }

        const checkbox = e.target;
        
        // Подключение checkbox'a 'осреднить за час'
        if (checkbox.classList.contains('settingsGraphic__perhour')){
            
            if (checkbox.checked){ 

                const dataXAveragedPerHour = [];
                // Осредняем данные для оси X
                for (let value of Object.values(data)){

                    let date = value.Date.split(/[-:\s]/g);
                    let stringDate = `${date[0]}-${date[1]}-${date[2]} ${date[3]}:00:00`

                    if (!dataXAveragedPerHour.includes(stringDate)){
                        dataXAveragedPerHour.push(stringDate);
                    }
                }                

                chart.data.labels = dataXAveragedPerHour.slice(0,-1);

                // Осредняем данные для каждого датчика
                for (let actSensor of activedSensors){

                    let dataYAveragedPerHour = [];
                    let dataYperHour = [];

                    const titleDevice = actSensor.parentElement.previousElementSibling.textContent;

                    let currentHour = +data["0"].Date.split(/[-:\s]/g)[3];                    

                    for (let value of Object.values(data)){                                                                         
                        if (!(value.uName === titleDevice))
                            continue;
                        
                        let hour = +value.Date.split(/[-:\s]/g)[3];                         

                        if (currentHour === hour){  

                            dataYperHour.push(value.data[actSensor.textContent]);                            
                        }
                        else{
                            dataYAveragedPerHour.push(dataYperHour.reduce((a, e) =>a +e, 0)/ dataYperHour.length);
                                
                            currentHour = hour;
                            dataYperHour = [value.data[actSensor.textContent]];         
                        }
                    } 
                    
                    //Вставляем данные в график
                    for (let i = 0; i < chart.data.datasets.length; i ++){

                        if  (chart.data.datasets[i].label === actSensor.textContent){

                            chart.data.datasets[i].data = dataYAveragedPerHour;
                        }
                    }                    
                }            
                chart.update();
            }

            else{

                for (let actSensor of activedSensors){

                    actSensor.dispatchEvent(new CustomEvent("click", {
                        bubbles:true,
                        detail:{
                            NotToggled:true, // не переключаем датчик 
                        }
                    }));

                }
            }
            return;
        }

        //Осредняем за 3 часа
        if (checkbox.classList.contains('settingsGraphic__perthreehours')){

        }
    })
}
