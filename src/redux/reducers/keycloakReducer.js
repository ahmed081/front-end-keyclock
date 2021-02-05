export default (state = {}, action) =>{
    switch (action.type) {
      case 'AUTHENTICATE':
        return {...action.payload}
      default:
        return {}
    }
  }