import { useState } from "react";
import { View, TextInput } from "react-native";

import { CountableButton } from "./CountableButton";
import { CommonStyles } from "../styles/CommonStyles";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={CommonStyles.row}>
      <TextInput placeholder="Enter name" value={name} onChangeText={setName} />
      <CountableButton
        label="Add"
        submit={() => {
          if (name.trim() === "") {
            return;
          }
          addNewCountable(name);
          setName("");
        }}
      />
    </View>
  );
};
