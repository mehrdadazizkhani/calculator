const display = document.querySelector(".result")
const allClearBtn = document.querySelector(".all-clear")
const histories = document.querySelector(".histories")

function addGlobalEventListener (type, selector, callback) {
    document.addEventListener(type, event => {
        if (event.target.matches(selector)) {
            callback(event)
        }
    })
}

let result = "";

const numberHandler = (event) => {
    
    allClearBtn.textContent = "C"

    if (result == "0") {
        result = ""
    }
    result += event.target.textContent
    display.innerText = result
}

const operatorHandler = (event) => {
    const lastChar = result.slice(-1)

    if (lastChar != "%" && lastChar != "/" && lastChar != "*" && lastChar != "-" && lastChar != "+" && result) {
        allClearBtn.textContent = "C"
        result += event.target.textContent
        display.innerText = result
    }
}

const equalHandler = () => {
    if (result) {
        const rounded = Math.round((eval(result) + Number.EPSILON) * 10000) / 10000;
        const history = document.createElement("div")
        history.textContent = `${result} = ${rounded}`
        histories.appendChild(history)
        result = rounded.toString()
        display.innerText = result
    }
}

const deleteHandler = () => {
    if (result != "0" && result.length > 1) {result = result.slice(0, -1)}
    display.innerText = result 
}

const allClearHandler = (event) => {
    if (event.target.textContent == "C") {
        display.innerText = "0"
        result = "0"
        event.target.textContent = "AC"
    } else {
        histories.innerHTML = ""
    };
}

addGlobalEventListener("click", ".number", numberHandler)
addGlobalEventListener("click", ".operator", operatorHandler)
addGlobalEventListener("click", ".equal", equalHandler)
addGlobalEventListener("click", ".delete", deleteHandler)
addGlobalEventListener("click", ".all-clear", allClearHandler)