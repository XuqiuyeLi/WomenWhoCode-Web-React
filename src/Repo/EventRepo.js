class EventRepo {
  getList() {
    return Promise.resolve([
      {id: 1, name: 'First Event'},
      {id: 2, name: 'Second Event'}
    ])
  }
}

export default EventRepo