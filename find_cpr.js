var generateCpr = {

  cprList: [],
  dob: 0,

  possibilities: [
    [0, 1, 2, 3, 4, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  ],

  setGender: function(gender){
    if(gender == "male"){
      this.possibilities[3] = [1, 3, 5, 7, 9];
    }else if(gender == "female"){
      this.possibilities[3] = [0, 2, 4, 6, 8];
    }else{
      this.possibilities[3] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  },

  setDob: function(dob){
    this.dob = dob;
  },

  getCprList: function(){
    return this.cprList;
  },

  recursiveSearch: function(number, depth) {
    number = number || "";
    depth = depth || 0;
    var i = 0;

    while (i < this.possibilities[depth].length) {

      // number is less than for digits
      if (depth + 1 < this.possibilities.length) {
        this.recursiveSearch(number + this.possibilities[depth][i], depth + 1);

      // number is four digits
      } else {
        var cpr = number + this.possibilities[depth][i];

        // cpr number is valid
        if (this.validateCPR(cpr)) {
          this.cprList.push(cpr);
        }
      }
      i++;
    }
  },

  validateCPR: function(cpr) {
    var fullcpr = this.dob + cpr;
    var sum = 0;
    var factors = [4, 3, 2, 7, 6, 5, 4, 3, 2, 1];
    var i = 0;

    while (i < 10) {
      sum += fullcpr.substring(i, i + 1) * factors[i];
      i++;
    }
    if ((sum % 11) !== 0) {
      return false;
    } else {
      return true;
    }
  }
};