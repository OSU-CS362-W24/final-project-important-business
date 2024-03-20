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
    expect(generateChartImg.generateChartImg(type, data, xLabel, yLabel, title, color)).toContain("https://")
})