var List = function(name){
  this.name = name;
  this.tests = [];
};

List.prototype.addTest = function(name, method) {
  this.tests.push({
    name: name,
    method: method
  })
};

module.exports = List;
