import _ from "lodash";
import React, { PureComponent } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  Card,
  Text,
  Image,
  ListItem,
  Carousel,
  Spacings,
  View,
  ExpandableSection,
  Switch,
} from "react-native-ui-lib";

const cardImage2 = require("../assets/coffee.png");
const cardImage = require("../assets/coffee.png");
const chevronDown = require("../assets/coffee.png");
const chevronUp = require("../assets/coffee.png");

import hamburger from '../assets/Hamburger_icon.png'

const elements = [
  <Card style={{ marginBottom: 10 }} onPress={() => {}}>
    <Card.Section
      content={[
        { text: "Card #1", text70: true, dark10: true },
        { text: "card description", text90: true, dark50: true },
      ]}
      style={{ padding: 20 }}
    />
    <Card.Section source={cardImage2} imageStyle={{ height: 120 }} />
  </Card>,
  <Card style={{ marginBottom: 10 }} onPress={() => {}}>
    <Card.Section
      content={[
        { text: "Card #2", text70: true, dark10: true },
        { text: "card description", text90: true, dark50: true },
      ]}
      style={{ padding: 20 }}
    />
    <Card.Section source={cardImage} imageStyle={{ height: 120 }} />
  </Card>,
  <Card style={{ marginBottom: 10 }} onPress={() => {}}>
    <Card.Section
      content={[
        { text: "Card #3", text70: true, dark10: true },
        { text: "card description", text90: true, dark50: true },
      ]}
      style={{ padding: 20 }}
    />
    <Card.Section source={cardImage2} imageStyle={{ height: 120 }} />
  </Card>,
];

export default class ExpandableSectionScreen extends PureComponent {
  state = {
    expanded: false,
    top: false,
  };

  onExpand() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  getChevron() {
    if (this.state.expanded) {
      return this.state.top ? chevronDown : chevronUp;
    }
    return this.state.top ? chevronUp : chevronDown;
  }

  getHeaderElement() {
    return (
      <View margin-10 spread row>
        <Text dark10 text60>
          ExpandableSection's sectionHeader
        </Text>
      </View>
    );
  }

  getBodyElement() {
    return (
      <Carousel pageWidth={350} itemSpacings={Spacings.s2}>
        {_.map(elements, (element, key) => {
          return (
            <View key={key} margin-12>
              {element}
            </View>
          );
        })}
      </Carousel>
    );
  }

  render() {
    const { expanded, top } = this.state;

    return (
      <ExpandableSection
        top={false}
        expanded={expanded}
        sectionHeader={<Image style={styles.icon} source={hamburger} />}
        onPress={() => this.onExpand()}
      >
        <TouchableOpacity>
          <Text dark10 text60>
            Menu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text dark10 text60>
            Logout
          </Text>
        </TouchableOpacity>
      </ExpandableSection>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    width: 30,
    height: 30
  },
});
