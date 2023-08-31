import React, { useContext } from "react";
import { MandatoryHoursComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";
import Footer from "../../../components/molecules/Footer";
import Lottie from "react-lottie";
import buildingLottie from "../../../assets/lotties/building.json";
import { DefaultText } from "../../../components/atoms";

const MandatoryHours = () => {
  const { themeColors } = useContext(ThemeContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",

    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
        maxWidth: 600,
        textAlign: "center",
        margin: "auto",
      }}
    >
      <Lottie
        options={{ ...defaultOptions, animationData: buildingLottie }}
        height={300}
        width={300}
      />
      <DefaultText style={{ fontSize: 30, marginBottom: 8 }}>
        Em construção
      </DefaultText>
      <DefaultText style={{ opacity: 0.5 }}>
        (isso pode levar um tempo)
      </DefaultText>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MandatoryHours;
