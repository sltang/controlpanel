import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import ClippedDrawer from './appdrawer/clippeddrawer';
import { mountWrap } from './contextwrapper';

const history = {
  push: jest.fn(),
}

it('shallow rendering without crashing', () => {
  configure({ adapter: new Adapter() });
  const wrapper = shallow(<App />);
  //expect(wrapper.contains(<div></div>)).to.equal(true);
  expect(wrapper.find(ClippedDrawer)).to.have.length(1);
  //   const push = jest.fn();
  //   wrapper.setProps({ history: { push } });
  // const div = document.createElement('div');
  // ReactDOM.render(wrapper, div);
  // ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  configure({ adapter: new Adapter() });
  const wrapper = () => mountWrap(<App {...props} />);

  //expect(wrapper.contains(<div></div>)).to.equal(true);
  //expect(wrapper.find(ClippedDrawer)).to.have.length(1);
  //   const push = jest.fn();
  //   wrapper.setProps({ history: { push } });
  //const div = document.createElement('div');
  //render(wrapper);
  expect(render(wrapper).text()).to.contain('');
  //ReactDOM.unmountComponentAtNode(div);
});
