var generateCpr = {

  cprList: [],
  dob: 0,
  gender: "",

  possibilities: [
    [1, 2, 3, 0], // Omitting: 4, 9
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  ],

  // initialize
  init: function(dob, gender){
    this.cprList = [];

    this.setDob(dob);
    this.setGender(gender);
    this.recursiveSearch();

    return this.cprList;
  },

  // Set gender ("male", "female" or "")
  setGender: function(gender){
    this.gender = gender;
    this.updateLastDigitPossibilities(gender);
  },

  // Set Date of Birth (Format: 241289 for 24/12-1989)
  setDob: function(dob){
    this.dob = dob;
  },

  // Update possibilities for last digit in CPR-number
  updateLastDigitPossibilities: function(gender){

    // uneven numbers for men
    if(gender == "male"){
      this.possibilities[3] = [1, 3, 5, 7, 9];

    // even numbers for women
    }else if(gender == "female"){
      this.possibilities[3] = [0, 2, 4, 6, 8];
    }
  },

  // Create all possible cpr-numbers
  recursiveSearch: function(depth, partialCpr) {
    partialCpr = partialCpr || "";
    depth = depth || 0;

    for (var i = 0; i < this.possibilities[depth].length; i++) {

      // partialCpr is less than 3 digits
      if (depth < 3) {
        var nextpartialCpr = partialCpr + "" + this.possibilities[depth][i];
        var nextDepth = depth + 1;
        this.recursiveSearch(nextDepth, nextpartialCpr);

      // partialCpr is 3 digits. Add the last digit
      } else {
        var cpr = partialCpr + "" + this.possibilities[3][i];

        // cpr partialCpr is valid
        if (this.validateCPR(cpr)) {
          this.cprList.push(cpr);
        }
      }
    }
  },

  // modulus 11 test
  validateCPR: function(cpr) {
    var fullcpr = this.dob + cpr;
    var factors = [4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

    for (var i = 0, sum = 0; i < factors.length; i++) {
      sum += fullcpr.substring(i, i + 1) * factors[i];
    }

    // pass modulus 11 test?
    return sum % 11 !== 0 ? false : true;
  }
};