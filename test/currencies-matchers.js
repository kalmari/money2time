describe('Currency', function() {
    describe('#USD', function() {
        it('should parse', function() {
            var formats = ['$12', '$12.34', 'US $12', 'US $12.34'];
            for (var i = 0; i < formats.length; i++) {
                assert(formats[i].match(currencies.USD.matches))
            }
        });
    })
});