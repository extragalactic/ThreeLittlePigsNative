import React from 'react';
import {
  ScrollView,
  View,
  AlertIOS,
  Linking,
  Text,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import _ from 'lodash';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import { getCustomer } from '../../graphql/queries';

import { addNotes } from '../../graphql/mutations';

class _GiftedChatContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };
    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this._isAlright = null;
  }
  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: _.reverse(this.props.data.customer.notes),
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, _.reverse(this.props.data.customer.notes)),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
     this.props.addNotes({ variables: {
      custid: this.props.data.customer.id,
      name: `${this.props.user.firstName} ${this.props.user.lastName}`,
      userid: this.props.id,
      text: messages[0].text,
      createdAt: messages[0].createdAt,
    } });
      this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages,{
          _id: Math.round(Math.random() * 1000000),
          text: messages[0].text ,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'John Fritz',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        } ),
      };
    });

    // for demo purpose
   // this.answerDemo(messages);
  }

  onReceive(text) {
    console.log(text)
    
    this.setState((previousState) => { 
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'John Fritz',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
     
    });
     
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

 renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
    <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        user={{
          _id: 1, // sent messages should have same user._id
        }}
        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}
const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

const GiftedChatContainer = compose(
  graphql(getCustomer, {
    options: ({ id }) => ({ variables: { id } }),
  }),
  graphql(addNotes, { name: 'addNotes' }),
)(_GiftedChatContainer);

export default GiftedChatContainer;
