import _ from "lodash";
import React, { PureComponent, useState } from "react";
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



export default function Hamburger() {
  const [expanded, setExpanded] = useState(false)


 const onExpand = () => {
    setExpanded(!expanded)
    };


  // getChevron() {
  //   if (this.state.expanded) {
  //     return this.state.top ? chevronDown : chevronUp;
  //   }
  //   return this.state.top ? chevronUp : chevronDown;
  // }

  // getHeaderElement() {
  //   return (
  //     <View margin-10 spread row>
  //       <Text dark10 text60>
  //         ExpandableSection's sectionHeader
  //       </Text>
  //     </View>
  //   );
  // }

  // getBodyElement() {
  //   return (
  //     <Carousel pageWidth={350} itemSpacings={Spacings.s2}>
  //       {_.map(elements, (element, key) => {
  //         return (
  //           <View key={key} margin-12>
  //             {element}
  //           </View>
  //         );
  //       })}
  //     </Carousel>
  //   );
  // }




    return (
      <ExpandableSection
        top={false}
        expanded={expanded}
        sectionHeader={<Image style={styles.icon} source={hamburger} />}
        onPress={onExpand}
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
        <TouchableOpacity>
          <Text dark10 text60>
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text dark10 text60>
            Logout
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

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    width: 30,
    height: 30
  },
});
