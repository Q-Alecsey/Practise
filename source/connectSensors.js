
// Создает график исходя из датчика
export function findSensor(data){

    document.addEventListener("click", (e) =>{

        if (!e.target.classList.contains("showSensors__grid-button"))
            return;
    
        const sensor = e.target;
        // Для оптимизации кода во время поиска данных , убирает одну итерацию
        const titleDevice = e.target.parentElement.previousElementSibling.textContent;

        if (!e.detail.NotToggled)
             sensor.classList.toggle("showSensors__grid-button--actived");
        else{

            const datasets = chart.data.datasets;

            for (let i = 0; i < datasets.length; i ++){

                if (datasets[i].label === sensor.textContent){

                    colorsForGraphic[datasets[i].borderColor] = false;
                    
                    datasets.splice(i, 1);
                }
            }
        }

        if (sensor.classList.contains("showSensors__grid-button--actived")){            

            //Ограничение по количеству линий на графике (конкретно 5)
            if (chart.data.datasets.length > 4) {

                sensor.classList.remove("showSensors__grid-button--actived");
                return;
            }

            let dataX = [];
            let dataY = [];

            // Заполнение данными оси X , Y
            for (let item of Object.values(data)){

                if (item.uName === titleDevice){                

                    dataX.push(item.Date);
                    dataY.push(item.data[sensor.textContent]);
                }              
            }

            // инициализация цвета для графика
            let color;

            for (let item in colorsForGraphic){

                if (colorsForGraphic[item] === false){
                    
                    colorsForGraphic[item] = true;
                    
                    color = item;
                    
                    break;
                }
            }

            chart.data.labels = dataX;
            chart.data.datasets.push(
                {
                    label:sensor.textContent, // Название графика
                    data:dataY, // [{}]  
                    pointStyle:false,
                    borderWidth:2,
                    borderColor: color,
                }
            );
            
            chart.update();            
        }

        else{

            // удаление датчика
            const datasets = chart.data.datasets;

            for (let i = 0; i < datasets.length; i ++){

                if (datasets[i].label === sensor.textContent){

                    colorsForGraphic[datasets[i].borderColor] = false;
                    
                    datasets.splice(i, 1);
                }
            }

            chart.update();
        }
    })
}

