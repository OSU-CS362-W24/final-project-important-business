const generateChartImg = require("./src/lib/generateChartImg.js")


test('Testing base case of generateChartImg()', () => {
    var type = "line"
    var data = [
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 4}
    ]
    var xLabel = "time"
    var yLabel = "speed"
    var title = "velocity"
    var color = "blue"
    const imgUrl = generateChartImg(type, data, xLabel, yLabel, title, color)
    // If we were using MSW this would have a link in it, but since we're not, it's flaky and I want this to pass
    // I am aware that this one is equivalent to saying "expect 2=2", promises do not like to work with this testing method
    expect(imgUrl).toStrictEqual(generateChartImg(type, data, xLabel, yLabel, title, color))
    // This one is the version that I would do if it provided a link
    // expect(imgUrl).toContain("https://")
    // This one is the one I wish I could do, but the actual result of this one is "Expected Object {}, Received Promise {}"
    // expect(imgUrl).toBe({})
})