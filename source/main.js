
import {createButton, EventListenerForButtons} from "./createButton.js";
import {findSensor} from "./connectSensors.js";
import {connectCheckBox} from "./checkbox.js";
import { timeRange } from "./timeRange.js";

let data; // data from file; 

// Сетка , где отображаются все приборы
const grid = document.querySelector(".dataBlock__device-grid");

// Все приборы из данного файла
const buttonDevices = new Set();

// Пишет насчет возникающих ошибок
const labelFile = document.querySelector(".dataBlock__data-label");

// Та невидимая часть кнопки , которая вызывает event
const inputFile = document.querySelector(".dataBlock__data-input");

// Видимая часть кнопки , служит в качестве декорации
const buttonFile = document.querySelector(".dataBlock__data-InputButton");

// Данная переменная служит для того , чтобы функции из других файлов вызывались ровно один раз
let alreadyDone = false

// Подключение Кнопки("Выберите Файл") к прослушивателю
inputFile.addEventListener("change", async (e) =>{

    const file = e.target.files[0];

    if (!file) return;

    // Очистка страницы 

    [...grid.querySelectorAll(".dataBlock__device-button")].forEach( el =>{

        if (el.classList.contains("dataBlock__device-button--actived")){
            
            el.dispatchEvent(new Event("click", {bubbles:true}));
        }
        el.remove();
    })
    labelFile.textContent = "";
    buttonFile.classList.remove("dataBlock__data-inputButton--error");

    [...document.querySelectorAll(".showSensors")].forEach(el =>{
        el.remove();
    });

    //

    let reader = new FileReader();
    
    reader.addEventListener("load", function(){
        
        try{
            data = JSON.parse(this.result);
        }

        catch(e) {
            
            labelFile.textContent = "Произошла Ошибка";
            buttonFile.classList.add("dataBlock__data-inputButton--error");
            
            return;
        }
        
        for (let item in data){
            
            buttonDevices.add(data[item].uName)
        }

        startDate = Object.values(data).at(0).Date;
        endDate = Object.values(data).at(-1).Date;

        document.querySelector(".customTime__dateFile").textContent =
        `Временной промежуток в файле : ${startDate}  ->  ${endDate}`;
        
        // Функции из сторонних файлов
        
        buttonDevices.forEach(el => createButton(el)); 
        
        if (!alreadyDone){
            EventListenerForButtons(data);
            timeRange(data);
            findSensor(data);
            connectCheckBox(data);

            alreadyDone = true;
        }
    });

    reader.readAsText(file);
            
});
