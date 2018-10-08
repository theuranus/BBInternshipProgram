let x = 0, y = 0, op = "";

function loadEvent() {
    let screen = document.getElementById("screen");
    let btns = document.getElementsByName("btn");
    let report = document.getElementById("report");
    report.value = "";
    btns.forEach(btn => btn.addEventListener("click", (event) => {
        let val = event.currentTarget.value;

        //check number clicked
        if(!isNaN(val)) {
            let onScr = screen.value.trim();
            if(onScr === "0") {
                screen.value = val;
            }
            else {
                onScr += val;
                if(onScr[0] === '0' && onScr[1] !== '.') {
                    onScr = onScr.substring(1);
                }
                screen.value = onScr;
            }
        }

        // clear clicked
        if(val ==='AC') {
            reset();
        }

        // operator clicked
        if(isOperator(val)) {
            x = parseFloat(screen.value);
            op = val;
            screen.value = "0";
        }

        // dot clicked
        if (val === ".") {
            let onScr = screen.value;
            if(onScr.indexOf(".") == -1) {
                if(onScr === "0") {
                    screen.value = "0.";
                }
                else {
                    screen.value = onScr + ".";
                }
            } else {
                if(onScr.indexOf(".") == onScr.length-1) {
                    onScr = onScr.substring(0, onScr.length-1);
                    screen.value = onScr;
                }
            }
        }

        if (val === "=") {
            y = parseFloat(screen.value);
            if(op !== "") {
                switch(op) {
                    case "+": {
                        screen.value = (x + y);
                        break;
                    }
                    case "-": {
                        screen.value = (x - y);
                        break;
                    }
                    case "*": {
                        screen.value = (x * y);
                        break;
                    }
                    case "/": {
                        if(y == 0) {
                            screen.value = "Math Error";
                        } else {
                            screen.value = (x / y);
                        }
                        break;
                    }
                }
            }
            report.value += x + op + y + "=" + screen.value + "\n";
            x = 0;
            y = 0;
            op = "";
        }

    }));
}

function reset() {
    document.getElementById("screen").value = "0";
    x = 0;
    y = 0;
    op = "";
}

function isOperator(op) {
    return op === "+" || op === "-" || op === "*" || op === "/";
}

