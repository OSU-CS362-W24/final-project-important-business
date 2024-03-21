/*
 * @jest-environment jsdom
*/

const fs = require("fs")


require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
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

beforeEach(function() {
    window.localStorage.clear()
    jest.resetModules()
    jest.restoreAllMocks()
})

test("Assure the add values button adds an x and y input field with label", async function() {
	// Arrange: 
   	initDomFromFiles(__dirname + "/src/line/line.html", __dirname + "/src/line/line.js")

	// Aquire: 
	const addBtn = domTesting.getByText(document, "+")

    // Act: 
   	const user = userEvent.setup()
   	await user.click(addBtn) 

   	// Assert: 
	const xInputs = domTesting.getAllByText(document, "X")
    const yInputs = domTesting.getAllByText(document, "Y")

    expect(xInputs).toHaveLength(2)
    expect(yInputs).toHaveLength(2)
})

test("Assure the add values button adds an x and y input field with label multiple times", async function() {
	// Arrange: 
   	initDomFromFiles(__dirname + "/src/line/line.html", __dirname + "/src/line/line.js")

	// Aquire: 
	const addBtn = domTesting.getByText(document, "+")

    // Act: 
   	const user = userEvent.setup()
   	await user.click(addBtn) 
    await user.click(addBtn)
    await user.click(addBtn)
    await user.click(addBtn)

   	// Assert: 
	const xInputs = domTesting.getAllByText(document, "X")
    const yInputs = domTesting.getAllByText(document, "Y")

    expect(xInputs).toHaveLength(5)
    expect(yInputs).toHaveLength(5)
})


test("Assure the clear button removes extra fields and resets needed fields", async function() {
	// Arrange: 
   	initDomFromFiles(__dirname + "/src/line/line.html", __dirname + "/src/line/line.js")

	// Aquire: 
    const addBtn = domTesting.getByText(document, "+")
	const clearBtn = domTesting.getByText(document, "Clear chart data")

    const xLab = domTesting.getByLabelText(document, "X label")
    const yLab = domTesting.getByLabelText(document, "Y label")

    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    const chartColor = domTesting.getByLabelText(document, "Chart color")

    // Act: 
   	const user = userEvent.setup()
    // add in extra fields
    await user.type(domTesting.getByText(document, "X"), "2")
    await user.type(domTesting.getByText(document, "Y"), "2")
    await user.click(addBtn)
    await user.type(xLab, "testLabelx")
    await user.type(yLab, "testLabely")
    await user.type(chartTitle, "testChartLabel")
    await user.type(chartColor, "#e66465")


    // clear fields
    await user.click(clearBtn) 
   	
    // Assert: 

	const xInputs = domTesting.getAllByText(document, "X")
    const yInputs = domTesting.getAllByText(document, "Y")
    expect(xInputs).toHaveLength(1)
    expect(yInputs).toHaveLength(1)
    expect(xInputs[0].value).toBe(undefined)
    expect(yInputs[0].value).toBe(undefined)
    expect(chartTitle).toBeEmptyDOMElement()
    expect(chartColor).toBeEmptyDOMElement()
    expect(xLab).toBeEmptyDOMElement()
    expect(yLab).toBeEmptyDOMElement()
    
})


test("Assure alert is displayed upon missing labels", async function() {
	// Arrange: 
   	initDomFromFiles(__dirname + "/src/line/line.html", __dirname + "/src/line/line.js")

	// Aquire: 
	const graphBtn = domTesting.getByText(document, "Generate chart")
    const xLab = domTesting.getByLabelText(document, "X label")
    const yLab = domTesting.getByLabelText(document, "Y label")

    // Act: 
   	const user = userEvent.setup()
    await user.type(xLab, "xtestLabel")
    await user.type(yLab, "ytestLabel")

    const spy = jest.spyOn(window, "alert")
    spy.mockImplementation(function () {})
    await user.click(graphBtn)
    

   	// Assert: 
    expect(domTesting.getByLabelText(document, "X")).toBeEmptyDOMElement()
    expect(domTesting.getByLabelText(document, "Y")).toBeEmptyDOMElement()
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
})

test("Assure alert is displayed upon missing labels", async function() {
	// Arrange: 
   	initDomFromFiles(__dirname + "/src/line/line.html", __dirname + "/src/line/line.js")

	// Aquire: 
	const graphBtn = domTesting.getByText(document, "Generate chart")
    const xInput = domTesting.getByText(document, "X")
    const yInput = domTesting.getByText(document, "Y")

    // Act: 
   	const user = userEvent.setup() 
    await user.type(xInput, "2")
    await user.type(yInput, "5")
    
    const spy = jest.spyOn(window, "alert")
    spy.mockImplementation(function () {})
    await user.click(graphBtn)
    

   	// Assert: 
    expect(domTesting.getByLabelText(document, "X label")).toBeEmptyDOMElement()
    expect(domTesting.getByLabelText(document, "Y label")).toBeEmptyDOMElement()
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
})


test("Assure chart data is sent to chart generation function", async function() {
	// Arrange: 
    jest.mock("./src/lib/generateChartImg.js")
    const generateChartImgStub = require("./src/lib/generateChartImg")
    generateChartImgStub.mockImplementation(function() {
        return "http://placekitten.com/480/480"
    })
    
    initDomFromFiles(__dirname + "/src/line/line.html", __dirname + "/src/line/line.js")

    const user = userEvent.setup()

    // Aquire: 
    const addBtn = domTesting.getByText(document, "+")
    const graphBtn = domTesting.getByText(document, "Generate chart")

    const xLab = domTesting.getByLabelText(document, "X label")
    const yLab = domTesting.getByLabelText(document, "Y label")
    const chartTitle = domTesting.getByLabelText(document, "Chart title")
    const chartColor = domTesting.getByLabelText(document, "Chart color")
    await user.click(addBtn)
    const xInput = domTesting.getAllByText(document, "X")
    const yInput = domTesting.getAllByText(document, "Y")
   
    // Act: 
    await user.type(chartTitle, "testChartLabel")
    await user.type(chartColor, "#e66465")
    await user.type(xLab, "xtestLabel")
    await user.type(yLab, "ytestLabel")
    await user.type(xInput[0], "2")
    await user.type(yInput[0], "3")
    await user.type(xInput[1], "7")
    await user.type(yInput[1], "4")
    
   	await user.click(graphBtn) 

   	// Assert: 
    expect(generateChartImgStub).toHaveBeenCalledTimes(1)
    const chartRecord = generateChartImgStub.mock.calls[0]
	expect(chartRecord).toMatchObject(["line", [{"x": "2", "y": "3"}, {"x": "7", "y": "4"}], "xtestLabel", "ytestLabel", "testChartLabel", "#ff4500"])

    generateChartImgStub.mockRestore()
})