/**
 * @jest-environment jsdom
 */
const fs = require("fs")
const domTesting = require('@testing-library/dom')
const jestDom = require('@testing-library/jest-dom')
const chartStorage = require("./src/lib/chartStorage.js")
const userEvent = require("@testing-library/user-event").default

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
    initDomFromFiles(`${__dirname}/src/line/line.html`, `${__dirname}/src/lib/chartStorage.js`)

    const plus = domTesting.getByText(document, "+")
    const title_input = domTesting.getByLabelText(document, "Chart title")
    const x_input = domTesting.getByLabelText(document, "X")
    const y_input = domTesting.getByLabelText(document, "Y")
    const gen_button = domTesting.getByText(document, "Generate chart")
    const save_button = domTesting.getByText(document, "Save chart")
    
    const user = userEvent.setup()
    await user.click(plus)
    await user.type(title_input, "test title")
    await user.type(x_input, "1")
    await user.type(y_input, "1")
    await user.click(gen_button)
    await user.click(save_button)

    expect(window.localStorage.getItem("savedCharts")).not.toBe(null)
})

test('Testing base case loadAllSavedCharts()', () => {

})

test('Testing base case loadSavedChart()', () => {

})

test('Testing base case updateCurrentChartData()', () => {

})

test('Testing base case loadCurrentChartData()', () => {

})