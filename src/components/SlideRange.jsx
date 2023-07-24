import { Range, getTrackBackground } from "react-range";

export default function SlideRange({ query, setQuery }) {
  const STEP = 0.1;
  const MIN = 0;
  const MAX = 500;

  const intl = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const handlePrice = (values) => {
    console.log(values[1]);
    let newQuery = { ...query };
    newQuery.values[0] = values[0];
    newQuery.values[1] = values[1];
    setQuery(newQuery);
    // console.log(newQuery.values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "35rem",

        height: "5rem",
      }}
    >
      <Range
        allowOverlap={false}
        values={query.values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handlePrice}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "20px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                background: "transparent",
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "25px",
              width: "50px",
              borderRadius: "5px",
              backgroundColor: "#09B1BA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: `3px solid transparent`,
              color: "white",
              fontSize: "1.2rem",
            }}
          >
            {intl.format(query.values[index])}
          </div>
        )}
      />
      <Range
        allowOverlap={false}
        values={query.values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handlePrice}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  min: MIN,
                  max: MAX,
                  values: query.values,
                  colors: ["#CCC", "#09B1BA", "#CCC"],
                }),

                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "#09B1BA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: `1px solid white`,
            }}
          ></div>
        )}
      />
    </div>
  );
}