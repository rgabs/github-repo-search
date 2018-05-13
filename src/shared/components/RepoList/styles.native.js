export default {
  hightlightRowStyle: {backgroundColor: '#DBDBDB'},
  headerStyleMap: {
    true: {borderBottomWidth: 3},
    false: {borderTopWidth: 2}
  },
  listItem: {
    flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 2
  },
  listHeader: {
    flexDirection: 'row', elevation: 4, backgroundColor: '#383D42', margin: -5, marginBottom: 5, shadowColor: '#383D42',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    height: 45,
    shadowOffset: {
      width: 1,
      height: 2
    }
  },
  listHeaderItem: {
    flex: 1, marginTop: 5, justifyContent: 'center' 
  },
  headerText: {
    fontWeight: 'bold', paddingVertical: 10, textAlign: 'center', color: 'white', fontSize: 12 
  },
  activityIndicator: {flex: 1},
  rowText: {flex: 1, fontSize: 12}
};