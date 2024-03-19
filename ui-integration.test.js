/*
 * @jest-environment jsdom
*/

const fs = require("fs")

require("whatwg-fetch")
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