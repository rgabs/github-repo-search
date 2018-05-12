import React from 'react';
import { FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { result, sortBy } from 'lodash';
import { View } from 'react-native-animatable';
import { Divider, } from 'react-native-elements';
import styles from './styles.native';


class RepoList extends React.Component {
  state = {
    selectedHeader: '',
    headerValue: false,
    repos: this.props.repos
  }

  headerStyleMap = {
    true: { borderBottomWidth: 3 },
    false: { borderTopWidth: 2 }
  }

  getHeaderItemStye = (column) => this.state.selectedHeader === column.accessor && styles.headerStyleMap[this.state.headerValue]

  toggleHeader = (selectedHeader) => () => {
    const headerValue = this.state.selectedHeader === selectedHeader ? !this.state.headerValue : false;
    const sortedRepos = sortBy(this.props.repos, selectedHeader);
    this.setState({
      selectedHeader,
      headerValue
    });
    this.setState({ repos: headerValue ? sortedRepos.reverse() : sortedRepos });
  }

  componentWillReceiveProps({ repos }) {
    if (repos !== this.props.repos) {
      this.setState({ repos, selectedHeader: '', headerValue: false, });
    }
  }

  renderItem = ({ item }) => <View useNativeDriver animation='fadeIn' style={[styles.listItem, this.props.isUsersRepo(item) ? styles.hightlightRowStyle : {}]}>
    {this.props.columns.map((column, i) => (
      <Text key={i} style={{ flex: 1, fontSize: 12 }}>{result(item, column.accessor, '')}</Text>
    ))}
  </View>;

  ListHeader = () => (
    <View style={styles.listHeader}>
      {this.props.columns.map((column, i) => (
        <TouchableOpacity key={i}
          onPress={this.toggleHeader(column.accessor)}
          style={[styles.listHeaderItem, this.getHeaderItemStye(column)]}>
          <Text style={styles.headerText} >{column.Header}</Text>
        </TouchableOpacity>
      ))}

    </View>
  );

  keyExtractor = (item) => String(item.id);

  render() {
    return this.props.loading ?
          <ActivityIndicator size='large' color='#f50' style={styles.activityIndicator} /> :
          <FlatList stickyHeaderIndices={[0]}
            ItemSeparatorComponent={Divider} keyExtractor={this.keyExtractor} ListHeaderComponent={this.ListHeader}
            data={this.state.repos} renderItem={this.renderItem} />
    ;
  }
}

export default RepoList;