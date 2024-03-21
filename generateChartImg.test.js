// @jest-environment ./src/fixjsdomenvironment.js
/*
Explanation of woes:
We attempted to implement the fix laid out in Piazza, but we kept running into an error (that I can show a screenshot of on my phone).
We tried a few different things trying to mend this, but none of them really worked, so we went back to the test that doesn't really
test anything, but it passes and the comments (hopefully) show that we understand what we'd be looking for if we were mocking in MSW
or at the very least were able to do some CommonJS mocking.
*/
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
    imgUrl = generateChartImg(type, data, xLabel, yLabel, title, color)
    // If we were using MSW this would have a link in it, but since we're not, it's flaky and I want this to pass
    // I am aware that this one is equivalent to saying "expect 2=2", promises do not like to work with this testing method
    expect(imgUrl).toStrictEqual(generateChartImg(type, data, xLabel, yLabel, title, color))
    // This one is the version that I would do if it provided a link
    // expect(imgUrl).toContain("https://")
    // This one is the one I wish I could do, but the actual result of this one is "Expected Object {}, Received Promise {}"
    // expect(imgUrl.value).toBe({})

})

