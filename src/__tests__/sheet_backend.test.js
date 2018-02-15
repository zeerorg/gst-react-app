import { sheetsBackend } from '../Sheet/sheet_backend';
import Sheet from '../Sheet/sheet_model';

test('sheet backend test', () => {
    let title = "Test sheet";
    let details = "This is a test sheet";
    let entries = [];
    let docId;
    return sheetsBackend.addNewSheet(title, details).then((docReference)=>{
        docId = docReference.id;
        
        return sheetsBackend.getSheetDetail(docId);
    }).then((sheet) => {
        expect(sheet).toEqual(new Sheet(docId, title, details, entries));
        
    });
});

afterAll(() => {
    return sheetsBackend.deleteSheet(docId, []);
})

