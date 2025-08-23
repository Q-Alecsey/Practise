
export function findSensor(data){

    document.addEventListener("click", (e) =>{

        if (!e.target.classList.contains("showSensors__grid-button"))
            return;

        const sensor = e.target;
        // Для оптимизации кода во время поиска данных , убирает одну итерацию
        const titleDevice = e.target.parentElement.previousElementSibling.textContent;

        sensor.classList.toggle("showSensors__grid-button--actived");

        if (sensor.classList.contains("showSensors__grid-button--actived")){
            let dataX = [];
            let dataY = [];

            for (let item of Object.values(data)){

                if (item.uName === titleDevice){                

                    dataX.push(item.Date);
                    dataY.push(item.data[sensor.textContent]);
                }
                
            }

            chart.data.datasets[0].label = e.target.textContent;

            chart.data.labels = dataX;
            chart.data.datasets[0].data = dataY;
            
            chart.update();            
        }
    })
}

