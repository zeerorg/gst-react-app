import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ListItem from './ListItemStateless';
import SmallLinkButton from '../../global/components/SmallLinkButton';
import Entry from '../entry_model';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("ListItem", () => {
  let props;
  let mounted;
  const listItem = () => {
    if (!mounted) {
      mounted = shallow(
        <ListItem {...props} />
      );
    }
    return mounted;
  }

  beforeEach(() => {
    props = {
      entry: new Entry('A_Entry_E', 'A_Sheet_S', 12, "B2B", "07AAHPJ9323N1ZA", "12", new Date(), "Regular B2B", "Delhi", 27494, 23300, 18, 0, 2097, 2097)
    };
    mounted = undefined;
  });
  
  // All tests will go here
  it("tr is always mounted", () => {
    const trs = listItem().find("tr");
    expect(trs.length).toBeGreaterThan(0);
  });
  
  it("Should contain edit element", () => {
    const wrapper = listItem(); 
    expect(wrapper.find(SmallLinkButton).length).toBeGreaterThan(0);
  });
});
