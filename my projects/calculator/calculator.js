const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value
            .replace(/sin\(/g, "Math.sin(")
            .replace(/cos\(/g, "Math.cos(")
            .replace(/tan\(/g, "Math.tan(")
            .replace(/log\(/g, "Math.log10(");

        display.value = eval(expression);
    } catch (err) {
        display.value = "Error";
    }
}
let lastAns = 0;

function square() {
    display.value += '**2';
}

function factorial() {
    let n = parseFloat(display.value);
    if (isNaN(n) || n < 0) {
        display.value = "Error";
        return;
    }
    let fact = 1;
    for (let i = 2; i <= n; i++) {
        fact *= i;
    }
    display.value = fact;
}

function reciprocal() {
    let n = parseFloat(display.value);
    if (n === 0) {
        display.value = "Error";
        return;
    }
    display.value = 1 / n;
}

function toggleSign() {
    if (display.value.startsWith("-")) {
        display.value = display.value.slice(1);
    } else {
        display.value = "-" + display.value;
    }
}

function useAns() {
    display.value += lastAns;
}
