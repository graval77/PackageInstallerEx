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

/*Validation of Individual Packages*/
  var individualPackages = function() {
    var output = {};
      for(var i=0;i<input.length;i++){
        var values=input[i].split(':');
        var package = values[0].trim();
        var dependency = values[1].trim();
        if (package.length === 0) {
          throw 'Invalid Input: Please enter a Package Name';
        }
        if (!output[package]){
          output[package] = [];
        } 
        if (!output[dependency] && dependency.length > 0){
          output[dependency] = [];
        } 
        if (dependency.length > 0){
          output[package].push(dependency);
        }
      }
    return output;
  }

 /*Ordering according to dependencies*/
  var orderOfInstall = function(indvlPkgs) {
    var output = []; 
    var ordered = {};
    for(var i=0;i<Object.keys(indvlPkgs).length;i++){
      sort(Object.keys(indvlPkgs)[i], []);
    }
    function sort(package, mainPkg) {
      if (ordered[package]){
        return;
      }
      mainPkg.push(package);
      var pkg = indvlPkgs[package];
      for(var i=0;i<pkg.length;i++){
        if (mainPkg.indexOf(pkg[i]) >= 0) {
          throw 'Dependency Specification Contains a Cycle';
        }
        sort(pkg[i], mainPkg);
      }
      ordered[package] = true;
      output.push(package);
    }

    return output;
  }

  return {
    dependencyCheck: function() {
      var indvlPkgs = individualPackages();
      return orderOfInstall(indvlPkgs).join(', ');
    }
  };
};