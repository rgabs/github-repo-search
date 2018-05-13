// This mock will make sure that we are able to access mapStateToProps, mapDispatchToProps and reactComponent in the test file.
// To use this, just do `jest.mock('react-redux');` in your page.test.js file.
// Ref: https://gist.github.com/rgabs/1afa3f0058baf0d491a24d096f6085c7

const mockDispatch = jest.fn((action) => action);

module.exports = {
  connect: (mapStateToProps, mapDispatchToProps) => (reactComponent) => ({
    mapStateToProps,
    mapDispatchToProps: (dispatch = mockDispatch, ownProps) => mapDispatchToProps(dispatch, ownProps),
    reactComponent,
    mockDispatch
  }),
  Provider: ({children}) => children
};
