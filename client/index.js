const body = document.querySelector('body')
const tbody = document.querySelector('.clients-tbody')

const addButton = document.querySelector('.clients-add-button')

const {
  addModal,
  closeButton,
  addFormLastNameInput,
  addFormSurnameInput,
  addFormFirstNameInput,
  saveButton,
  addForm
} = createAddModal()

document.addEventListener('DOMContentLoaded', getClients)

function getClients(e) {
  e.preventDefault()
  fetch('http://localhost:3000/api/clients')
    .then(resp => resp.json())
    .then(data => {
      let clients = data
      return clients.map(client => {
        createNewClient(client.name, client.surname, client.lastName, client.id)
      })
    })
}

async function addClients() {
    await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(
        new Client(
          addFormSurnameInput.value,
          addFormFirstNameInput.value,
          addFormLastNameInput.value
        )
      )
    })
    addForm.reset()
    document.location.reload()
}

async function deleteClient(id) {
  await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
  return {}
}

function getCreatedDate() {
  const day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
  const month = new Date().getMonth() < 10 ? '0' + (new Date().getMonth() + 1).toString() : new Date().getMonth() + 1
  const year = new Date().getFullYear()

  return day + '.' + month + '.' + year
}

function Client(surname, name, lastName) {
  this.createdAt = getCreatedDate()
  this.updatedAt = '2021-02-03T13:07:29.554Z',
  this.name = name
  this.surname = surname
  this.lastName = lastName
  this.contacts = [
    {
      type: 'Телефон',
      value: '+71234567890'
    },
    {
      type: 'Email',
      value: 'abc@xyz.com'
    },
    {
      type: 'Facebook',
      value: 'https://facebook.com/vasiliy-pupkin-the-best'
    }
  ]
}

function addNewClient() {
  body.appendChild(addModal)
}
// ADD NEW CLIENT MODAL
function createAddModal() {
  const addModal = document.createElement('div')
  addModal.classList.add('add-modal')

  const closeButton = document.createElement('div')
  closeButton.classList.add('close-button-modal')

  const addModalTitle = document.createElement('h3')
  addModalTitle.innerHTML = 'Новый клиент'
  addModalTitle.classList.add('add-modal-title')

  const addForm = document.createElement('form')
  addForm.classList.add('add-modal-form')

  const addFormSurnameInput = document.createElement('input')
  addFormSurnameInput.type = 'text'
  addFormSurnameInput.placeholder = 'Фамилия'
  addForm.appendChild(addFormSurnameInput)

  const addFormFirstNameInput = document.createElement('input')
  addFormFirstNameInput.type = 'text'
  addFormFirstNameInput.placeholder = 'Имя'
  addForm.appendChild(addFormFirstNameInput)

  const addFormLastNameInput = document.createElement('input')
  addFormLastNameInput.type = 'text'
  addFormLastNameInput.placeholder = 'Отчество'
  addForm.appendChild(addFormLastNameInput)

  const addFormContactButton = document.createElement('button')
  addFormContactButton.type = 'button'
  addFormContactButton.innerText = 'Добавить контакт'
  addForm.appendChild(addFormContactButton)

  const saveButton = document.createElement('button')
  saveButton.type = 'button'
  saveButton.innerText = 'Сохранить'
  addForm.appendChild(saveButton)

  const cancelButton = document.createElement('a')
  cancelButton.innerText = 'Отмена'
  cancelButton.href = '/'
  addForm.appendChild(cancelButton)


  addModal.appendChild(closeButton)
  addModal.appendChild(addModalTitle)
  addModal.appendChild(addForm)

  return {
    addModal,
    closeButton,
    addModalTitle,
    addForm,
    addFormLastNameInput,
    addFormSurnameInput,
    addFormFirstNameInput,
    addFormContactButton,
    saveButton,
    cancelButton
  }
}

function createNewClient(name, surname, middleName, clientId) {
  const row = document.createElement('tr')
  row.classList.add('clients-tbody__row')
  let id = document.createElement('td')
  id.classList.add('clients-tbody__item', 'id-item')
  let clientName = document.createElement('td')
  clientName.classList.add('clients-tbody__item', 'name-item')
  let createdAt = document.createElement('td')
  createdAt.classList.add('clients-tbody__item', 'created-date')
  let updatedAt = document.createElement('td')
  updatedAt.classList.add('clients-tbody__item', 'updated-date')
  let contacts = document.createElement('td')
  contacts.classList.add('clients-tbody__item', 'socials')
  let editBlock = document.createElement('td')
  editBlock.classList.add('clients-tbody__item', 'edit-item')
  let editIcon = document.createElement('div')
  editIcon.classList.add('edit-icon')
  editBlock.appendChild(editIcon)
  editBlock.innerHTML = 'Изменить'
  let deleteBlock = document.createElement('td')
  deleteBlock.classList.add('clients-tbody__item', 'delete-item')
  let deleteIcon = document.createElement('div')
  deleteIcon.classList.add('delete-icon')
  deleteBlock.appendChild(deleteIcon)
  deleteBlock.innerHTML = 'Удалить'

  deleteBlock.addEventListener('click', () => deleteClient(clientId))

  id.innerHTML = clientId
  clientName.innerHTML = surname + ' ' + name + ' ' + middleName
  createdAt.innerHTML = getCreatedDate()
  updatedAt.innerHTML = '11.05.2023'
  contacts.innerHTML = []

  row.appendChild(id)
  row.appendChild(clientName)
  row.appendChild(createdAt)
  row.appendChild(updatedAt)
  row.appendChild(contacts)
  row.appendChild(editBlock)
  row.appendChild(deleteBlock)

  tbody.appendChild(row)

  return {
    row, id, clientName, createdAt, updatedAt, contacts, editBlock, deleteBlock, deleteIcon, editIcon
  }
}

function closeAddModal() {
  body.removeChild(addModal)
}

saveButton.addEventListener('click', addClients)
closeButton.addEventListener('click', closeAddModal)
addButton.addEventListener('click', addNewClient)
