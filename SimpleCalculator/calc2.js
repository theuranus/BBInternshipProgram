(function() {

    const calc = document.getElementById('calc')
    let operation = ''

    calc.addEventListener('click', function(e) {
       if (e.target.matches('input[type="button"][value]')) {
        const val = e.target.value
        if (val === '=') {
            const result = eval(operation)
            console.log(result)
        } else {
            operation += val
        }
       } else {
           console.log('do nothing')
       }
    })

})()