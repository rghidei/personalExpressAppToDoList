var clearAll = document.getElementById('clearAll')
clearAll.addEventListener('click', clearEverything)
var removeCompleted = document.getElementById('removeBtn')
removeCompleted.addEventListener('click', removeAll)

var numberOfItems = document.getElementById('numberOfItems')
var items = document.querySelectorAll('li').length
console.log(items)
var completedItems = document.querySelectorAll('.done').length
console.log(completedItems)
numberOfItems.innerText = items - completedItems


const tasks = document.querySelectorAll('.task')
for(ele of tasks){
  ele.addEventListener('click', crossOut)
}
console.log(tasks)
// var removeCompleted = document.getElementsById('#removeCompleted')

console.log('pannda')

function clearEverything() {

        const activity = this.parentNode.parentNode.childNodes[1].innerText
        fetch('clear', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'activity': activity
          })
        }).then(function (response) {
          window.location.reload()
        })

};

function removeAll() {
 console.log('great')
        const isCompleted = this.parentNode.parentNode.querySelector('.hide').innerText

        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({

            'isCompleted': isCompleted,

          })
        }).then(function (response) {
          window.location.reload()
        })

};

function crossOut(){
  console.log('hi')

  const activity = this.parentNode.parentNode.childNodes[1].innerText
  const isCompleted = this.parentNode.parentNode.querySelector('.hide').innerText
  const objectId = this.parentElement.id
  console.log(objectId === '605b9c6ee01e871025cf2788')
  fetch('messages', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'activity': activity,
      'isCompleted': isCompleted,
      '_id': objectId
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })


}





// const activity = this.parentNode.parentNode.childNodes[1].innerText
// const isCompleted = this.parentNode.parentNode.childNodes[3].innerText
// const objectId = this.parentNode.parentNode.querySelector('.tags').innerText
// fetch('messages', {
//   method: 'put',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({
//     'activity': activity,
//     'isCompleted': isCompleted,
//     '_id': objectId
//   })
// })
// .then(response => {
//   if (response.ok) return response.json()
// })
// .then(data => {
//   console.log(data)
//   window.location.reload(true)
// })
// Array.from(removeCompleted).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const activity = this.parentNode.parentNode.childNodes[1].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'activity': activity
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
