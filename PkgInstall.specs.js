describe('Package Installer', function() {
  describe('Input Check: Will throw error', function() {
	  
	it('when the input is just a string', function() {
      expect(function() { new packageInstallerEx('a'); }).toThrow();
    });

  it('when the input is a number', function() {
      expect(function() { new packageInstallerEx(1); }).toThrow();
    });
  
  it('when the input is an array that contains numbers', function() {
      expect(function() { new packageInstallerEx([1,2]); }).toThrow();
    });

  it('when the input is an object', function() {
      expect(function() { new packageInstallerEx({ a:'b' }); }).toThrow();
    });	
    
  it('when the input is an array that contains object', function() {
      expect(function() { new packageInstallerEx([{a:'b'},{c:'d'}]); }).toThrow();
    });
  });

  describe('Success', function() {
    it('when the input contains an array of single string', function() {
      var input = ['a:'];
      expect(new packageInstallerEx(input).dependencyCheck()).toEqual('a');
    });
  
   it('when the input contains many individual packages', function() {
      var input = ['a:','b:','c:','d:','e:'];
      expect(new packageInstallerEx(input).dependencyCheck()).toEqual('a, b, c, d, e');
    });

   it('when the input is not in order', function() {
      var input = ['b:a','c:b','a:'];
      expect(new packageInstallerEx(input).dependencyCheck()).toEqual('a, b, c');
    });

   it('when a package is a dependency of multiple packages', function() {
      var input = ['a:','b:a','c:a','d:c','e:c'];
      expect(new packageInstallerEx(input).dependencyCheck()).toEqual('a, b, c, d, e');
    });
  
   it('when a package name contains special characters', function() {
      var input = ['{###}:'];
      expect(new packageInstallerEx(input).dependencyCheck()).toEqual('{###}');
    });
    
    it('when the input contains duplication of package dependencies', function() {
      var input = ['a:','b:', 'b:a'];
      expect(new packageInstallerEx(input).dependencyCheck()).toEqual('a, b');
    });

    it('when a package name contains two words separated by space', function() {
      var input = ['Kitten Service:Camel Caser', 'Camel Caser:'];
      expect(new packageInstallerEx(input).dependencyCheck()).toEqual('Camel Caser, Kitten Service');
    });  
  });
});