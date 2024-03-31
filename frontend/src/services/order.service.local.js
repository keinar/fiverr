
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'orders'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
  addOrderMsg,
  getDefaultFilter,
  getFilterFromParams

}
window.cs = orderService

_createOrders()
async function query(filterBy = {}) {
  const orders = await storageService.query(STORAGE_KEY);
  let ordersToReturn = [...orders];

  if (filterBy.loggedinUser) {
    // Filter only the orders of the logged-in user
    ordersToReturn = ordersToReturn.filter(order => order.buyer._id === filterBy.loggedinUser);
  }

  return ordersToReturn;
}

function getById(OrderId) {
  return storageService.get(STORAGE_KEY, OrderId)
}

async function remove(OrderId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, OrderId)
}

function getDefaultFilter() {
  return {
    tags: [],
    txt: ''
  }
}

// function getFilterFromParams(searchParams) {
//   const defaultFilter = getDefaultFilter()
//   const filterBy = {}
//   for (const field in defaultFilter) {
//       filterBy[field] = searchParams.get(field) || defaultFilter[field]
//   }
//   return filterBy
// }
function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}

  for (const field in defaultFilter) {
    const fieldValue = searchParams.get(field)

    if (field === "tags") {
      // Convert tags to an array
      filterBy[field] = fieldValue ? fieldValue.split(",") : defaultFilter[field]
    } else {
      // Keep other parameters as they are
      filterBy[field] = fieldValue || defaultFilter[field]
    }
  }

  return filterBy
}


async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await storageService.put(STORAGE_KEY, order)
  } else {
    // Later, owner is set by the backend
    // order.owner = userService.getLoggedinUser()
    savedOrder = await storageService.post(STORAGE_KEY, order)
  }
  return savedOrder
}

async function addOrderMsg(orderId, txt) {
  // Later, this is all done by the backend
  const order = await getById(orderId)
  if (!order.msgs) order.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt
  }
  order.msgs.push(msg)
  await storageService.put(STORAGE_KEY, order)

  return msg
}
function createOrder(model = '', type = '', batteryStatus = 100) {
  return {
    model,
    batteryStatus,
    type
  }
}

function getEmptyOrder() {
  const buyer = {
    "_id": "u103",
    "fullname": "user3",
    "imgUrl": "/img/img3.jpg"
  }
  const seller = {
    "_id": "u104",
    "fullname": "user4",
    "imgUrl": "/img/img4.jpg"
  }
  const gig = {
    _id: 'i101',
    tags: 'Design Logo',
    title,
    daysToMake: 4
  }
  const status = 'pending'
  const packages = 'basic'


  return {
    buyer,
    seller,
    gig,
    status,
    packages
  }
}

// TEST DATA
function _createOrders() {
  let orders = utilService.loadFromStorage(STORAGE_KEY)
  if (!orders || !orders.length) {
    orders = [
      {
        "_id": "o1225",
        "buyer": {
              "_id": "u103",
              "fullname": "user3",
              "imgUrl": "/img/img3.jpg"
            },
        "seller": {
              "_id": "u104",
              "fullname": "user4",
              "imgUrl": "/img/img4.jpg"
            },
        "gig": {
          "_id": "i101",
          "tags": "Design Logo",
          "price": 20,
          "daysToMake": 4,
          "packages": 'basic',
          "title" : "I will design clean and responsive wordpress website"
        },
        "status": "pending"
      },

    ]
    

   
    utilService.saveToStorage(STORAGE_KEY, orders)
  }


}



// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




