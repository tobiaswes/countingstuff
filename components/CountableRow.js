import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({
  countable,
  changeCount,
  removeCountable,
  index,
}) => (
  <View style={CommonStyles.row}>
    <View style={styles.nameColumn}>
      <Text style={CommonStyles.textItem}>{countable.name}</Text>
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    <View style={styles.buttonColumn}>
      <CountableButton
        label="+"
        submit={() => {
          changeCount(1, index);
        }}
      />
      <CountableButton
        label="-"
        submit={() => {
          changeCount(-1, index);
        }}
      />
      <TouchableOpacity onPress={() => removeCountable(index)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
  },
  buttonColumn: {
    flex: 0.2,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    marginTop: 1,
  },
});
