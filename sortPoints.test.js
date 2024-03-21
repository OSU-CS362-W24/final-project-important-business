const sortPoints = require("./src/lib/sortPoints.js")

test('Testing with standard values with a known result', () => {
    var testArray = [
        { x: 3, y: 3 },
        { x: 1, y: 1 },
        { x: 2, y: 2 }
    ]
    var sortedArray = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 }
    ]
    expect(sortPoints(testArray)).toStrictEqual(sortedArray)
})

test('Testing with negative values', () => {
    var testArray = [
        { x: -9, y: -9},
        { x: -10, y: -10},
        { x: -12, y: -12},
        { x: -100, y: -100}
    ]
    var sortedArray = [
        { x: -100, y: -100},
        { x: -12, y: -12},
        { x: -10, y: -10},
        { x: -9, y: -9}
    ]
    expect(sortPoints(testArray)).toStrictEqual(sortedArray)
})

test('Testing with equal X-values, unequal Y-values', () => {
    var testArray = [
        { x: 0, y: -9},
        { x: 0, y: -10},
        { x: 0, y: -12},
        { x: 0, y: -100}
    ]
    var sortedArray = [
        { x: 0, y: -9},
        { x: 0, y: -10},
        { x: 0, y: -12},
        { x: 0, y: -100}
    ]
    expect(sortPoints(testArray)).toStrictEqual(sortedArray)
})

test('Testing with unequal X-values, equal Y-values', () => {
    var testArray = [
        { x: -9, y: 0},
        { x: -10, y: 0},
        { x: -12, y: 0},
        { x: -100, y: 0}
    ]
    var sortedArray = [
        { x: -100, y: 0},
        { x: -12, y: 0},
        { x: -10, y: 0},
        { x: -9, y: 0}
    ]
    expect(sortPoints(testArray)).toStrictEqual(sortedArray)
})

test('Testing with all 0 values', () => {
    var testArray = [
        { x: 0, y: 0},
        { x: 0, y: 0},
        { x: 0, y: 0},
        { x: 0, y: 0}
    ]
    var sortedArray = [
        { x: 0, y: 0},
        { x: 0, y: 0},
        { x: 0, y: 0},
        { x: 0, y: 0}
    ]
    expect(sortPoints(testArray)).toStrictEqual(sortedArray)
})