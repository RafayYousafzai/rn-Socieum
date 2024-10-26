import "react-native-gesture-handler";
import React, { useEffect } from "react";
import RootNavigator from "./src/modules/navigation/rootNavigator";
import { Provider } from "./src/modules/redux/provider";
import * as SplashScreen from 'expo-splash-screen';
//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
SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn); // it's good to explicitly catch and inspect any error


export default function App() {
  useEffect(() => {

    // Hides native splash screen after 2s
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);



  })
  return (
    <Provider>
      <RootNavigator />
    </Provider>
  );
}
