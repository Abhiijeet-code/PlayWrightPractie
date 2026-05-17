const ExcelJS = require("exceljs");
const { test, request } = require('@playwright/test');
const path = require('path');


const workbook = new ExcelJS.Workbook();
// workbook.xlsx.readFile("/Abhi/TestCases.xlsx").then(function () {
//     const worksheet = workbook.getWorksheet("Test Cases");

//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(cell.value);
//         })
//     })
// })

let output = {
    rowNum: -1,
    colNum: -1
}
async function writeExcelTest(searchText, replacedText, change, filePath) {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    await readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.rowNum, output.colNum + change.colChange);
    cell.value = replacedText
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === searchText) {
                output.rowNum = rowNumber;
                output.colNum = colNumber;
            }
        })
    })

}

//writeExcelTest("Kivi", 300, { rowChange: 0, colChange: 2 }, "/Abhi/Test.xlsx");

test("Upload/Download file", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", { name: 'Download' }).click();
    const download = await downloadPromise;

    const downloadPath = path.join("C:", "Users", "abhid", "Downloads", "download.xlsx");
    await download.saveAs(downloadPath);

    await writeExcelTest("Kivi", 350, { rowChange: 0, colChange: 2 }, downloadPath);
    await page.locator("#fileinput").setInputFiles(downloadPath);
})