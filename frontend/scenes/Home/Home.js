import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router'

import { Flex } from 'reflexbox';
import Layout from 'components/Layout';
import CenteredContent from 'components/CenteredContent';
import SlackAuthLink from 'components/SlackAuthLink';

import styles from './Home.scss';

@observer(['user'])
export default class Home extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
  }

  componentDidMount = () => {
    if (this.props.user.authenticated) {
      browserHistory.replace('/dashboard');
    }
  }

  render() {
    return (
      <Flex auto>
        <Layout>
          <CenteredContent>
            <div className={ styles.intro }>
              <h1 className={ styles.title }>Simple, fast, markdown.</h1>
              <p className={ styles.copy }>We're building a modern wiki for engineering teams.</p>
            </div>
            <div className={ styles.action }>
              <SlackAuthLink>
                <img
                  alt="Sign in with Slack"
                  height="40"
                  width="172"
                  src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                  srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
                />
              </SlackAuthLink>
            </div>
          </CenteredContent>
        </Layout>
      </Flex>
    );
  }
}
