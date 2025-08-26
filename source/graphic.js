
//using Chart

const canvas = document.querySelector(".graphicBlock__drawing");
const context = canvas.getContext("2d");

// для красоты
const colorsForGraphic = {
    "#000000":false,
    "#FF0000":false, 
    "#00FF00":false, 
    "#0000FF":false, 
    "#007b5d":false,
};

const configGraphic = {
    type: 'line',
    data: {
        labels: null, // labels -> отображение по оси X
        datasets:[],
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

