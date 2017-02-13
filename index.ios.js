/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Linking,
    TouchableOpacity,
    async,
} from 'react-native';

var articles;

class testproj1 extends Component {
    
    
    constructor() {
        super();
        
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        
        
        this.getArticles = this.getArticles.bind(this)
        
        
        this.state = {
        dataSource: ds.cloneWithRows([{title:'temp1', links:{self:"www.google.pt"}, image:{renditions:{self:"url(/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png) no-repeat"}}, section:{title:"section1"}},
                                      {title:'temp2', links:{self:"www.ebay.com"}, image:{renditions:{self:"url(/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png) no-repeat"}}, section:{title:"section2"}}]),
        }

        this.getArticles();

    };
    
    render() {
        if(articles && articles.length > 0)
            this.state.dataSource = this.state.dataSource.cloneWithRows(articles);
        
        return (
                <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                <TouchableOpacity onPress={() => {
                Linking.openURL(rowData.links.self).catch(err => console.error('Error: ', err));
//                this.openArticle(rowData)
                }
                }>
                <View>
                <Image  source={{uri:rowData.image.renditions.medium}} style={styles.articleImage}/>
                <Text style={styles.articleTitle}>{rowData.title}</Text>
                <Text style={styles.articleSection}> On {rowData.section.title}</Text>
                <Text style={styles.articlePublished}> At {rowData.published} </Text>
                <Text style={styles.articlePublisher}> By {rowData.publisher}</Text>
                
                </View>
                </TouchableOpacity>}
                />
                );
        
    }
    
    



 getArticles(){
     var arts;
     var that = this;
    fetch("https://news.api.stv.tv/v1.1/mobile/3057?relations=image,section,byline", {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          arts = responseData.results;
          that.setState({ dataSource : ds.cloneWithRows(responseData.results)});
          articles = responseData.results;
    })
    .done();
};

}




const styles = StyleSheet.create({
                                 articleImage: {
                                 width: 355,
                                 height: 220,
                                 flex: 0,
                                 justifyContent: 'center',
                                 marginRight: 10,
                                 marginLeft: 10,
                                 },
                                 articleTitle: {
                                 width: 355,
                                 height: 60,
                                 flex: 0,
                                 fontSize: 22,
                                 textAlign: 'center',
                                 margin: 0,
                                 },
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F5FCFF',
                                 },
                                 welcome: {
                                 fontSize: 20,
                                 textAlign: 'center',
                                 margin: 10,
                                 },
                                 instructions: {
                                 textAlign: 'center',
                                 color: '#333333',
                                 marginBottom: 5,
                                 },
                                 separator: {
                                 flex: 1,
                                 height: StyleSheet.hairlineWidth,
                                 backgroundColor: '#8E8E8E',
                                 },
                                 });

AppRegistry.registerComponent('testproj1', () => testproj1);
