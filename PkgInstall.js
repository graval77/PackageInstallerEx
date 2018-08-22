var packageInstallerEx = function (input) {
  
	/*Validation of Input*/
	if (input === null || !Array.isArray(input)){
		throw 'Invalid Input: Input cannot be null or Input should be of type Array';
  }
	for(var i=0;i<input.length;i++){
    if(typeof input[i]!=='string'){
      throw 'Invalid Data Type: Array values should be of type String';
    } 
  }

  };