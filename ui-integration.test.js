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

