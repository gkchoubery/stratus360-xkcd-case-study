const VISITS = {};

module.exports = (id) => {
    VISITS[id] = VISITS[id] ? ++VISITS[id]: 1;
    return VISITS[id]; 
}