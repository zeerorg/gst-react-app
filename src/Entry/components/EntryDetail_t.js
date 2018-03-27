import React from 'react';
import Enzyme, { mount } from 'enzyme';
jest.mock('../entry_backend');
import { entryBackend } from '../entry_backend';
import EntryDetail from './EntryDetail';
import Entry from '../entry_model';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { JSDOM } from 'jsdom';
const doc = new JSDOM('<!doctype html><html><body></body></html>')
global.document = doc.window.document;
global.window = doc.window;

describe("EntryDetail", () => {
  let props;
  let mounted;
  const entryDetail = () => {
    return mount(
        <EntryDetail {...props} />
      );
  }

  beforeEach(() => {
    props = {
      match: { params: { entry_id: "1XsL9k2jjLxe18ZjL7Zv" } }
    };
    mounted = undefined;
  });
  
  // All tests will go here
  
  it("Should contain div", () => {
    const wrapper = entryDetail();
    expect(wrapper.find("div").length).toBeGreaterThan(0);
    wrapper.unmount();
  });

  it("contains type input as 'B2B'", () => {
    const wrapper = entryDetail();
    while(wrapper.state("status") === 'fetching') console.log("going");
    console.log(wrapper.debug());
    expect(wrapper.find("input[name='type']").get(0).value).toBe("B2B");
    wrapper.unmount();
  });
});
