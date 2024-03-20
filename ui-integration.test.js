/*
 * @jest-environment jsdom
*/

const fs = require("fs")

require("whatwg-fetch")
require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const exp = require("constants")
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
    const yLab = domTesting.getByLabelText(document, "X label")

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