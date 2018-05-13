import React from 'react';
import RepoContainer from '../ReposContainer';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';


jest.mock('react-table/react-table.css', () => null);


describe('RepoContainer group Test', () => {
  let instance;
  const props = {
    repos : [
      {id: 123, name: 'abc'},
      {id: 543, name: 'xync'},
      {id: 123, name: 'rsc'},
    ],
    setCache: jest.fn()
  };
  beforeEach(() => {
    instance = shallow(<RepoContainer.reactComponent {...props} />).instance();
  });
  it('RepoContainer: snapshot test', () => {
    const snapshot = renderer.create(<RepoContainer.reactComponent repos={[]} setCache={jest.fn} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  it('componentDidMount: should call setCache and set repos', () => {
    expect(instance.props.setCache).toHaveBeenCalled();
    expect(instance.state.repos).toEqual(props.repos);
  });
  it('toggleHeader: should sort column', () => {
    const selectedHeader = {Header: 'Repo Title', accessor: 'name', sortBy: 'name'};
    const sortedRepos = [
      {'id': 123, 'name': 'abc'}, 
      {'id': 123, 'name': 'rsc'}, 
      {'id': 543, 'name': 'xync'}
    ];
    expect(instance.state.selectedHeader).toEqual({});
    instance.toggleHeader(selectedHeader)();
    expect(instance.state.selectedHeader).toEqual(selectedHeader);
    expect(instance.state.headerValue).toEqual(false);
    expect(instance.state.repos).toEqual(sortedRepos);
  });
  it('onNextPress: should increment startIndex', () => {
    instance.onNextPress();
    expect(instance.state.startIndex).toBe(5);
    instance.onNextPress();
    expect(instance.state.startIndex).toBe(10);
  });
  it('onPreviousPress: should decrement startIndex', () => {
    instance.setState({startIndex: 25});
    instance.onPreviousPress();
    expect(instance.state.startIndex).toBe(20);
    instance.onPreviousPress();
    expect(instance.state.startIndex).toBe(15);
  });
  it('changeRowsCount: should change rowsCount and reset startIndex', () => {
    instance.setState({startIndex: 25});
    instance.changeRowsCount(10);
    expect(instance.state.rowsCount).toBe(10);
    expect(instance.state.startIndex).toBe(0);
  });
});