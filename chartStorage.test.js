/**
 * @jest-environment jsdom
 */
const fs = require("fs")
require('@testing-library/jest-dom')
const chartStorage = require("./src/lib/chartStorage.js")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function() {
        require(jsPath)
    })
}

test('Testing base case saveChart()', async function() {
    const chart = {"type":"line","data":[{"x":"1","y":"1"}],"xLabel":"xtest","yLabel":"ytest","title":"test title","color":"#ff4500"}
    chartStorage.saveChart(chart)
    expect(window.localStorage.getItem("savedCharts" || "[0]")).toStrictEqual("[{\"type\":\"line\",\"data\":[{\"x\":\"1\",\"y\":\"1\"}],\"xLabel\":\"xtest\",\"yLabel\":\"ytest\",\"title\":\"test title\",\"color\":\"#ff4500\"}]")
})

test('Testing base case loadAllSavedCharts()', () => {
    const charts = [{"type":"line","data":[{"x":"1","y":"1"}],"xLabel":"test","yLabel":"test","title":"test","color":"#ff4500"},{"type":"line","data":[{"x":"1","y":"1"}],"xLabel":"xtest","yLabel":"ytest","title":"test title","color":"#ff4500"}]
    const chart = {"type":"line","data":[{"x":"1","y":"2"}],"xLabel":"xtest","yLabel":"ytest","title":"test title","color":"#ff4500"}
    chartStorage.saveChart(chart)
    const loadedCharts = chartStorage.loadAllSavedCharts()
    expect(loadedCharts).toStrictEqual([{"color": "#ff4500", "data": [{"x": "1", "y": "1"}], "title": "test title", "type": "line", "xLabel": "xtest", "yLabel": "ytest"}, {"color": "#ff4500", "data": [{"x": "1", "y": "2"}], "title": "test title", "type": "line", "xLabel": "xtest", "yLabel": "ytest"}])
})

test('Testing base case loadSavedChart()', () => {
    const chart = {"type":"line","data":[{"x":"1","y":"1"}],"xLabel":"xtest","yLabel":"ytest","title":"test title","color":"#ff4500"}
    const loadedChart = chartStorage.loadSavedChart(0)
    expect(loadedChart).toStrictEqual({"type":"line","data":[{"x":"1","y":"1"}],"xLabel":"xtest","yLabel":"ytest","title":"test title","color":"#ff4500"})
})

test('Testing base case updateCurrentChartData()', () => {
    const upChart = {"type":"line","data":[{"x":"1","y":"1"},{"x":"2","y":"2"}],"xLabel":"xtest","yLabel":"ytest","title":"test title","color":"#ff4500"}
    chartStorage.updateCurrentChartData(upChart)
    expect(window.localStorage.getItem("currentChartData" || "[0]")).toStrictEqual("{\"type\":\"line\",\"data\":[{\"x\":\"1\",\"y\":\"1\"},{\"x\":\"2\",\"y\":\"2\"}],\"xLabel\":\"xtest\",\"yLabel\":\"ytest\",\"title\":\"test title\",\"color\":\"#ff4500\"}")
})

test('Testing base case loadCurrentChartData()', () => {
})