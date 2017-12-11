import SheetHelper from '../Sheet/sheet_helper';
import Sheet from '../Sheet/sheet_model';

let sheethelper = new SheetHelper();
test('Return sheet from key and data', () => {
    let sheet = new Sheet("hello", "Test sheet", "This is a test sheet", []);
    let data = {
        "title": "Test sheet",
        "details": "This is a test sheet"
    }
    const variable = sheethelper.toSheetWithoutEntries("hello", data);
    expect(variable).toEqual(sheet);
});