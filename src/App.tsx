import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setGeopositionAccess } from "./features/weather/slice";
import { selectHasGeopositionAccess } from "./features/weather/selectors";

function App() {
  const hasAccess = useAppSelector(selectHasGeopositionAccess);
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {
      dispatch(setGeopositionAccess(true));
    });
  }, [dispatch]);

  return <>APP - {`${hasAccess}`}</>;
}

export default App;
