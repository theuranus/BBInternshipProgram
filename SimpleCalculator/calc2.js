(function() {

    const calc = document.getElementById('calc');
    const screen = document.getElementById('screen');
    const report = document.getElementById('report');
    let operation = '';
    let result = 0;
    report.value = '';

    calc.addEventListener('click', function(e) {
        if (e.target.matches('input[type="button"][value]')) {
            const val = e.target.value;
            switch(val) {
                case '=': {
                    result = eval(operation);
                    screen.value = result;
                    report.value += operation + '=' + result + '\n';
                    break;
                }
                case 'AC': {
                    screen.value = '';
                    operation = '';
                    result = 0;
                    break;
                }
                default: {
                    operation += val;
                    screen.value = operation;
                    break;
                }
            }   
        }
    })
})()