import React from 'react';
import Tag from '../Tag';
import { shallow } from 'enzyme';

describe('Tag', () => {
  describe('Renders as expected', () => {
    it('should render with the appropriate type', () => {
      const tag = shallow(
        <Tag type="beta" />
      );
      expect(tag.hasClass('tag--beta')).toEqual(true);
    });

    it('should provide a default label based on the type', () => {
      const tag = shallow(
        <Tag type="beta" />
      );
      expect(tag.text()).toEqual('Beta');
      tag.setProps({ type: 'ibm' });
      expect(tag.text()).toEqual('IBM');
    });
  });

  it('should allow for a custom label', () => {
    const tag = shallow(
      <Tag type="beta">New Version!</Tag>
    );
    expect(tag.text()).toEqual('New Version!');
  });

  it('should support extra class names', () => {
    const tag = shallow(
      <Tag type="beta" className="extra-class" />
    );
    expect(tag.hasClass('extra-class')).toEqual(true);
  });
});
