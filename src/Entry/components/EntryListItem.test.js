import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../entry_backend');
import EntryListItem from './EntryListItem';
import ListItem from './ListItemStateless';
import Entry from '../entry_model';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { JSDOM } from 'jsdom';
const doc = new JSDOM('<!doctype html><html><body></body></html>')
global.document = doc.window.document;
global.window = doc.window;

describe("EntryListItem", () => {
  let props;
  const entryItem = (props, callback) => {
    let ref;
    let root = mount(
        <MemoryRouter>
          <table><tbody>
            <EntryListItem {...props} ref={r => ref=r} />
          </tbody></table>
        </MemoryRouter>
      );
    callback(root.find(EntryListItem), root, ref);
    root.unmount();
  }

  beforeEach(() => {
    const getEntryFn = async (entry_id) => new Entry('entry_id', 'sheet_id', 12, "B2B", "07AAHPJ9323N1ZA", "12", new Date(), "Regular B2B", "Delhi", 27494, 23300, 18, 0, 2097, 2097)
    props = {
      entry_id: 'entry_id',
      sheet_id: 'sheet_id',
      backend: {
        getEntry: jest.fn(getEntryFn)
      }
    };
  });
  
  // All tests will go here
  
  it("ListItem is mounted", async () => {
    entryItem(props, async (wrapper, root, ref) => {
      root.update();
      // while (wrapper.instance().state.status === 'fetching') await "";
      // console.log(wrapper.instance());
      wrapper.render().instance().setState({status: "fetched", entry: await props.backend.getEntry("", "")});
      console.log(root.update().debug());
      // expect(root.update().find(ListItem).length).toBeGreaterThan(0);
    });
  });

  it("Should contain tr", () => {
    entryItem(props, wrapper => {
      expect(wrapper.find("tr").length).toBeGreaterThan(0);
    });
  });
   
  it("supplied backend props is called", () => {
    entryItem(props, (wrapper, root, ref) => {
      //root.update()
      //root.render();
      //console.log(root.debug());
      // while (ref.state.status === 'fetching') continue;
      expect(wrapper.props()["backend"].getEntry).toHaveBeenCalled();
    });
  });
  
});
