
export function connectCheckBox(){

    document.addEventListener("change", (e) =>{
                
        const activedSensors = [...document.querySelectorAll(".showSensors__grid-button--actived")];

        if (activedSensors.length === 0){
            return;
        }

        if (e.target.classList.contains("settingsGraphic__barGraph")){
            
            if (e.target.checked)
                chart.config.type = "bar";
            else
                chart.config.type = "line";
            
            chart.update();
            return;
        }

        const checkbox = e.target;
        const dataJS = +checkbox.dataset.jsPernumber;        
        
        if (checkbox.checked){ 
            
            // Определяем currentHour ("час" , который удовлетворяет временным рамкам)
            let currentHour;
            for (let value of Object.values(this.data)){
                if (CompareDates(startDate, value.Date) && CompareDates(value.Date, endDate)){   
                    
                    currentHour = +value.Date.split(/[-:\s]/g)[3];
                    console.log(currentHour);
                    break;
                }
            }            

            let countHours = 0;
            let firstDevice = this.data["0"].uName;

            const dataXAveragedPerNumber = [];
            // Осредняем данные для оси X
            for (let value of Object.values(this.data)){

                if (firstDevice !== value.uName)
                    break;

                let date = value.Date.split(/[-:\s]/g);
                let stringDate = `${date[0]}-${date[1]}-${date[2]} ${date[3]}:00:00`;
                
                if (!(CompareDates(startDate, stringDate) && CompareDates(stringDate, endDate)))
                    continue;

                if (currentHour !== +date[3]){
                    
                    countHours++;
                    currentHour = +date[3];
                }
                
                if (countHours === dataJS){

                    if (!dataXAveragedPerNumber.includes(stringDate))
                        dataXAveragedPerNumber.push(stringDate);
                    countHours = 0;
                }
            }                 

            chart.data.labels = dataXAveragedPerNumber;

            // Осредняем данные для каждого датчика
            for (let actSensor of activedSensors){

                let dataYAveragedPerNumber = [];
                let dataYperNumber = [];

                let countHours = 0;

                // Определяем currentHour ("час" , который удовлетворяет временным рамкам)
                let currentHour;
                for (let value of Object.values(this.data)){
                    if (CompareDates(startDate, value.Date) && CompareDates(value.Date, endDate)){
                        currentHour = +value.Date.split(/[-:\s]/g)[3];
                        break;
                    }
               }              

                const titleDevice = actSensor.parentElement.previousElementSibling.textContent;

                for (let value of Object.values(this.data)){                                                                         
                    if (!(value.uName === titleDevice))
                        continue;

                    if (!(CompareDates(startDate, value.Date) && CompareDates(value.Date, endDate)))
                        continue;
                    
                    let hour = +value.Date.split(/[-:\s]/g)[3];      

                    if (currentHour !== hour){
                    
                        countHours++;
                        currentHour = hour;
                    }
                    
                    if (countHours === dataJS){     
                        
                        if (checkbox.classList.contains("settingsGraphic__min")){

                            dataYAveragedPerNumber.push(findMin(dataYperNumber));
                        }

                        else if (checkbox.classList.contains("settingsGraphic__max")){

                            dataYAveragedPerNumber.push(findMax(dataYperNumber));
                        }

                        else{
                            
                            dataYAveragedPerNumber.push(dataYperNumber.reduce((a, e) =>a + e, 0)/ dataYperNumber.length);
                        }

                        dataYperNumber = [];
                        countHours = 0;
                    }

                    dataYperNumber.push(value.data[actSensor.textContent]);                   
                }                 
                
                //Вставляем данные в график
                for (let i = 0; i < chart.data.datasets.length; i ++){

                    if  (chart.data.datasets[i].label === actSensor.textContent){

                        chart.data.datasets[i].data = dataYAveragedPerNumber;
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
        
    });
}

function findMax(array){

    let max = array[0];

    for (let item of array){

        if (max < item){

            max = item;
        }
    }    

    return max;
}

function findMin(array){

    let min = array[0];

    for (let item of array){

        if (min > item){

            min = item;
        }
    }

    return min;
}
