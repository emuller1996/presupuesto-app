import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useFacturas } from "../../../hooks/useFacturas";

export const ChartComponent = (props) => {
  ChartComponent.propTypes = {
    data: PropTypes.object.isRequired,
    colors: PropTypes.string,
  };
  const {
    data,
    colors: {
      backgroundColor = "transparent",
      lineColor = "#37aa20",
      textColor = "black",
      areaTopColor = "#5adf96",
      areaBottomColor = "transparent",
    } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 250,
    });
    chart.timeScale().fitContent();
    chart.priceScale("value")
    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      color: lineColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef}></div>;
};

/* const data = [
  { open: 10, high: 10.63, low: 9.49, close: 5.55, time: 1642427876 },
  { open: 9.55, high: 10.3, low: 9.42, close: 5.94, time: 1642514276 },
  { open: 9.94, high: 10.17, low: 9.92, close: 5.78, time: 1642600676 },
  { open: 9.78, high: 10.59, low: 9.18, close: 5.51, time: 1642687076 },
  { open: 9.51, high: 10.46, low: 9.1, close: 5.17, time: 1642773476 },
  { open: 15.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
  { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
  { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
  { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
  { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
]; */



export default function CharFacturas15Days() {
  const [data, setdata] = useState(null);
  const { getAllFacturasLastDays } = useFacturas();

  useEffect(() => {
    getFactura();
  }, []);

  const getFactura = async () => {
    try {
      const r = await getAllFacturasLastDays();
      setdata(
        r.map((i) => {
          return {
            ...i,
            value: parseInt(i.value),
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return <div>{data && <ChartComponent data={data} />}</div>;
}
