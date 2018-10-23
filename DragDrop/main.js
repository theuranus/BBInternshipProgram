const list = document.querySelector('ul')
const dropzone = document.querySelector('.dropzone')
const data = {
    list1: [
        { id: 'a' }
    ],
    list2: [
        { id: 'b' }
    ]
}

list.addEventListener('dragstart', e => {
    console.log('drag started')
    const value = e.target.dataset.value
    e.dataTransfer.setData('text', value)
})

dropzone.addEventListener('dragover', e => {
    e.preventDefault()
})
dropzone.addEventListener('dragenter', e => {
    console.log('drag enter')
})
dropzone.addEventListener('dragleave', e => {
    console.log('drag leave')
})
dropzone.addEventListener('drop', e => {
    e.preventDefault()
    console.log(e.dataTransfer.types)
    const value = e.dataTransfer.getData('text')
    console.log('drag drop', value)
})