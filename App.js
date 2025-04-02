import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";

export default function App() {
  const [countables, setCountables] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveCountables(countables);
    }
  }, [countables, isLoaded]);

  const changeCount = (amount, index) => {
    const newState = [...countables];

    newState[index].count = Math.max(0, newState[index].count + amount);
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const formattedName = name.trim().toLowerCase();

    if (formattedName === "") {
      alert("Detta fält får inte vara tomt, ange ett namn!");
      return;
    }

    const nameExist = countables.some(
      (countable) => countable.name.toLowerCase() === formattedName,
    );

    if (nameExist) {
      alert("Det här namnet används redan! Välj ett annat.");
      return;
    }
    if (!nameExist) {
      const newState = [...countables, { name, count: 0 }];
      setCountables(newState);
    }
    Keyboard.dismiss();
  };

  const removeCountable = (index) => {
    const countableToRemove = countables[index]; // Hämta objektet som ska tas bort
    Alert.alert(
      "Bekräfta borttagning",
      `Vill du verkligen ta bort "${countableToRemove.name}"?`,
      [
        {
          text: "Avbryt",
          onPress: () => console.log("Borttagning avbruten"),
          style: "cancel",
        },
        {
          text: "Ta bort",
          onPress: () => {
            const newState = countables.filter((_, i) => i !== index);
            setCountables(newState); // Ta bort objektet
          },
          style: "destructive",
        },
      ],
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "undefined"}
          style={styles.container}
        >
          <ScrollView>
            {countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCount={changeCount}
                removeCountable={removeCountable}
                index={index}
              />
            ))}
          </ScrollView>
          <AddRow addNewCountable={addNewCountable} />
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
