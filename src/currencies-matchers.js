var currencies = {
    USD: {
        matches: /(US )?\$(\d*\.?\d+)/g,
        matchingGroupIndex: 2
    },
    EUR: {
        matches: /EUR (\d*,?\d+)/g,
        normalizeValue: function(value) {
            return value.replace(/,/, '.')
        },
        matchingGroupIndex: 1
    },
    RUB: {
        matches: /(\d*\s?\d+)\s?р(уб)?\.?/g,
        normalizeValue: function(value) {
            return value.replace(/\s/, '')
        },
        matchingGroupIndex: 1
    }
};