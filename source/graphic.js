
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

// Сравнение дат

let startDate;
let endDate;

// Если date2 >= date1 , то true , иначе false
function CompareDates(date1 , date2){

    date1 = date1.split(/[:-\s]/g).map(el => +el);
    date2 = date2.split(/[:-\s]/g).map(el => +el);

    for (let i = 0; i < date1.length; i ++){
      
      if (date1[i] > date2[i])
        return false;
      
      if (date1[i] < date2[i])
        return true;
      
    }
    return true;
}

//

const configGraphic = {
    type:'line',
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

let chart = new Chart(context, Object.assign(configGraphic));

