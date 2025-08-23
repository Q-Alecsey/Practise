
//using Chart

const canvas = document.querySelector(".graphicBlock__drawing");
const context = canvas.getContext("2d");

const configGraphic = {
    type: 'line',
    data: {
        labels: null, // labels -> отображение по оси X
        datasets:[{
            label:'Неопределено', // Название графика
            data:null,
            pointStyle:false,
            borderWidth:2,
        }]
    },
    options:{
        scales:{

            x:{
                ticks:{
                    color:'rgb(50,50,50)',
                },
            },

            y:{
                ticks:{
                    color:'rgb(50,50,50)',
                },
            },
        }
    }
}

let chart = new Chart(context, configGraphic);

