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
});