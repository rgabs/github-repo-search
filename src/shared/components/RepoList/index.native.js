import React from 'react';
import styles from './styles.native';
import {ActivityIndicator, FlatList, Text, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import {View} from 'react-native-animatable';
import {result} from 'lodash';


class RepoList extends React.Component {
  getHeaderItemStye = (column) => this.props.selectedHeader.accessor === column.accessor && styles.headerStyleMap[this.props.headerValue]

  renderItem = ({item}) => (
    <View useNativeDriver animation='fadeIn' 
      style={[styles.listItem, this.props.isUsersRepo(item) ? styles.hightlightRowStyle : {}]}>
      {this.props.columns.map((column, i) => (
        <Text key={i} style={styles.rowText}>{result(item, column.accessor, '')}</Text>
      ))}
    </View>
  );

  ListHeader = () => (
    <View style={styles.listHeader}>
      {this.props.columns.map((column, i) => (
        <TouchableOpacity key={i}
          onPress={this.props.toggleHeader(column)}
          style={[styles.listHeaderItem, this.getHeaderItemStye(column)]}>
          <Text style={styles.headerText} >{column.Header}</Text>
        </TouchableOpacity>
      ))}

    </View>
  );

  keyExtractor = (item) => String(item.id);

  render () {
    return this.props.loading ?
      <ActivityIndicator size='large' color='#f50' style={styles.activityIndicator} /> :
      <FlatList stickyHeaderIndices={[0]}
        ItemSeparatorComponent={Divider} keyExtractor={this.keyExtractor} ListHeaderComponent={this.ListHeader}
        data={this.props.repos} renderItem={this.renderItem} />
    ;
  }
}

export default RepoList;