const coModal = document.getElementById('coModal')
const inModal = document.getElementById('inModal')
const coInput = document.getElementById('coMoBtn')
const inInput = document.getElementById('inMoBtn')

coModal.addEventListener('shown.bs.modal', () => {
  coInput.focus()
})

inModal.addEventListener('shown.bs.modal', () => {
    inInput.focus()
})